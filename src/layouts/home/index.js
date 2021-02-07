import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Typography, List, Button, CircularProgress } from '@material-ui/core';
import { getTasks, getTask, deleteTask } from '../../store/actions/tasks';
import TaskItem from '../../components/TaskItem';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0 0',
    },
    list: {
        width: '100%',
        maxWidth: 768,
    },
    title: {
        margin: '0 0 20px',
    },
    Button: {
        maxWidth: 768,
        width: '100%',
        height: 40,
        margin: '0 0 20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        }
    },
    loader: {
        width: 22,
        height: 22,
        display: 'flex',
        margin: '5px 0 0',
    }
});

const Home = ({ user, getTasks, tasks, getTask, deleteTask }) => {

    const history = useHistory()
    const classes = useStyles()

    const [didRender, setDidRender] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            history.push('/sign-in')
        } else if (!didRender) {
            getTasks(user._id)
            setDidRender(true)
        }
    }, [tasks])

    const handleDelete = async body => {
        try {
            setLoading(true)
            await deleteTask(body, tasks)
            await getTasks(user._id)
            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    const handleGetTask = async id => {
        try {
            setLoading(true)
            await getTask(id)
            history.push(`/edit/${id}`)
            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title} variant="h4">
                Lista de tareas
            </Typography>

            <Link className={classes.link} to="/add">
                <Button
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.Button }}
                >
                    Add New Task
                </Button>
            </Link>

            {loading ?
                <div>
                    <CircularProgress
                        classes={{ root: classes.loader }}
                        color="secondary"
                    />
                </div> : null
            }

            {tasks && tasks.length > 0 ?
                <List classes={{ root: classes.list }}>
                    {tasks.map((elem) => {
                        return (
                            <TaskItem
                                key={elem._id}
                                body={elem}
                                handleDelete={handleDelete}
                                handleEdit={handleGetTask}
                                loading={loading}
                            />
                        )
                    })}
                </List> : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user && state.user.user ? state.user.user : null,
    tasks: state.tasks && state.tasks.tasks ? state.tasks.tasks : null
})

const mapDispatchToProps = dispatch => ({
    getTasks: id => dispatch(getTasks(id)),
    getTask: id => dispatch(getTask(id)),
    deleteTask: (body, tasks) => dispatch(deleteTask(body, tasks)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
