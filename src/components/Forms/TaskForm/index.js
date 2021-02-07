import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    TextField: {
        maxWidth: 768,
        width: '100%',
        height: 40,
        margin: '0 0 60px',
    },
    TextFieldBig: {
        maxWidth: 768,
        width: '100%',
        margin: '0 0 60px',
    },
    Button: {
        maxWidth: 768,
        width: '100%',
        height: 40,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30px 0 20px',
        '@media screen and (max-width: 768px)': {
            padding: '0 20px',
        }
    },
    loader: {
        width: 22,
        height: 22,
        display: 'flex',
        margin: '0 0 0 15px',
    }
});

function TaskForm({
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
    loading,
    route,
}) {

    const classes = useStyles()

    return (
        <form className={classes.form}>
            <TextField
                label="Name*"
                type="text"
                name="name"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                classes={{ root: classes.TextField }}
                helperText={touched.name && errors.name ? errors.name : ''}
                error={touched.name && errors.name ? true : false}
            />

            <TextField
                label="Description*"
                type="text"
                name="content"
                multiline
                rows={4}
                variant="outlined"
                value={values.content}
                onBlur={handleBlur}
                onChange={handleChange}
                classes={{ root: classes.TextFieldBig }}
                helperText={touched.content && errors.content ? errors.content : ''}
                error={touched.content && errors.content ? true : false}
            />

            <Button
                variant="contained"
                disabled={!isValid || loading}
                color="primary"
                classes={{ root: classes.Button }}
                type="submit"
                onClick={handleSubmit}
            >
                {route === 'add' ?
                    'Add task' : 'Edit task'
                }
                {loading ?
                    <div>
                        <CircularProgress
                            classes={{ root: classes.loader }}
                            color="secondary"
                        />
                    </div> : null
                }
            </Button>
        </form>
    )
}

export default TaskForm;
