import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ListItem, ListItemText, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles({
    container: {
        border: '1px solid blue',
        margin: '0 0 10px',
    },
    delete: {
        cursor: 'pointer',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
            color: 'black',
            cursor: 'pointer',
            textDecoration: 'none',
        }
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
});

function TaskItem({ body, handleDelete, handleEdit, loading }) {

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={body.name}
                    secondary={
                        <p id="contentElem">{body.content}</p>
                    }
                />
                <div className={classes.buttonContainer}>
                    <Button
                        className={classes.link}
                        onClick={() => handleEdit(body._id)}
                        disabled={loading}
                    >
                        <Edit />
                    </Button>
                    <Button
                        className={classes.delete}
                        onClick={() => handleDelete(body)}
                        disabled={loading}
                    >
                        <Delete />
                    </Button>
                </div>
            </ListItem>
        </div>
    )
}

export default TaskItem;
