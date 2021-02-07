import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

const options = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
}

const SERVICE_URL = 'https://blackstone-backend.herokuapp.com/api/'

const gettingTasks = data => {
    return {
        type: GET_TASKS,
        data
    }
}

const gettingTask = data => {
    return {
        type: GET_TASK,
        data
    }
}

const updateTask = data => {
    return {
        type: UPDATE_TASK,
        data
    }
}

const deletingTask = data => {
    return {
        type: DELETE_TASK,
        data
    }
}

export const getTasks = id => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const notesDB = await axios.get(`${SERVICE_URL}notes/get_notes?id=${id}`, options)
            dispatch(gettingTasks(notesDB.data))
            resolve(notesDB.data)
        } catch (error) {
            let errorCode = 'An error occurred'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(gettingTasks([]))
            reject(errorCode)
        }
    })
}

export const getTask = id => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const noteDB = await axios.get(`${SERVICE_URL}notes/get_note?id=${id}`, options)
            dispatch(gettingTask(noteDB.data))
            resolve(noteDB.data)
        } catch (error) {
            let errorCode = 'An error occurred'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(gettingTask({
                name: '',
                content: '',
            }))
            reject(errorCode)
        }
    })
}

export const editTask = (body, oldList) => dispatch => {
    return new Promise(async (resolve, reject) => {
        let noteList = oldList
        let index = noteList.findIndex(elem => elem._id === body._id)
        try {
            const noteDB = await axios.put(`${SERVICE_URL}notes/update_note?id=${body._id}`, body, options)
            noteList[index] = noteDB.data
            dispatch(updateTask(noteList))
            resolve(noteList)
        } catch (error) {
            let errorCode = 'An error occurred'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(updateTask(oldList))
            reject(errorCode)
        }
    })
}

export const createTask = (body, oldList) => dispatch => {
    return new Promise(async (resolve, reject) => {
        let noteList = oldList
        try {
            const noteDB = await axios.post(`${SERVICE_URL}notes/create_note`, body, options)
            noteList.push(noteDB)
            dispatch(updateTask(noteList))
            resolve(noteList)
        } catch (error) {
            let errorCode = 'An error occurred'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(updateTask(oldList))
            reject(errorCode)
        }
    })
}

export const deleteTask = (body, oldList) => dispatch => {
    return new Promise(async (resolve, reject) => {
        let noteList = oldList.filter(elem => elem._id !== body._id)
        try {
            const noteDB = await axios.delete(`${SERVICE_URL}notes/delete_note?id=${body._id}`, options)
            dispatch(deletingTask(noteList))
            resolve(noteList)
        } catch (error) {
            let errorCode = 'An error occurred'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(deletingTask(oldList))
            reject(errorCode)
        }
    })
}
