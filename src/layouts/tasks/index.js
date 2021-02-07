import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { taskValidation } from '../../utils/validations';
import { getTask, editTask, createTask } from '../../store/actions/tasks';
import { useHistory, useParams } from 'react-router-dom';
import TaskForm from '../../components/Forms/TaskForm';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0 0',
    },
    link: {
        color: '#27417c',
        textDecoration: 'none',
        '&:hover': {
            color: '#27417c',
            textDecoration: 'none',
        }
    }
});

const SignUp = ({
    getTask,
    editTask,
    createTask,
    user,
    task,
    tasks,
}) => {

    const history = useHistory()
    const params = useParams()

    const [ loading, setLoading ] = useState(false)

    const classes = useStyles()

    const route = params.id ? 'edit' : 'add'

    const [ taskBody, setTaskBody ] = useState({
        name: '',
        content: '',
    })

    useEffect(() => {
        if (!user) {
            history.push('/sign-in')
        } else if (route === 'edit') {
            handleGetTask()
        }
    }, [])

    const handleGetTask = async () => {
        try {
            const data = await getTask(params ? params.id : '')
            setTaskBody(data)
            return
        } catch (error) {
            history.push('/')
        }
    }

    const handleProcessTask = async (values, { resetForm, setFieldError, setSubmitting }) => {
        setSubmitting(false);
        setLoading(true)
        const { name, content } = values;
        let body = {
            name,
            content,
            _id: task._id
        }
        try {
            if (route === 'edit') {
                await editTask(body, tasks)
            } else {
                body['userId'] = user._id
                await createTask(body, tasks)
            }
            resetForm()
            setLoading(false)
            history.push('/')
        } catch (error) {
            setFieldError(
                'name',
                error ? error : 'An error ocurred'
            );
        }
        setLoading(false)
        setSubmitting(true);
    }

    const initialValues = {
        name: route === 'add' ? '' : task.name,
        content: route === 'add' ? '' : task.content,
    }

    return (
        <>
            <div className={classes.container}>
                <Typography variant="h3" component="h4">
                    {route === 'add' ?
                        'Add New Task' : 'Edit Task'
                    }
                </Typography>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={taskValidation}
                onSubmit={handleProcessTask}
            >
                {props =>
                    <TaskForm
                        {...props}
                        loading={loading}
                        route={route}
                    />
                }
            </Formik> 
        </>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null,
    task: state.tasks && state.tasks.task ? state.tasks.task : {
        name: '',
        content: ''
    },
    tasks: state.tasks && state.tasks.tasks ? state.tasks.tasks : []
})

const mapDispatchToProps = dispatch => ({
    getTask: id => dispatch(getTask(id)),
    editTask: (body, tasks) => dispatch(editTask(body, tasks)),
    createTask: (body, tasks) => dispatch(createTask(body, tasks)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
