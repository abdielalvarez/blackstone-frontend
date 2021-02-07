import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';

const options = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
}

const SERVICE_URL = 'https://blackstone-backend.herokuapp.com/api/'

const creatingUser = (data) => {
    return {
        type: CREATE_USER,
        data
    }
}

const logingUser = (data) => {
    return {
        type: LOGIN_USER,
        data
    }
}

export const createUser = body => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('body', body);
            const userDB = await axios.post(`${SERVICE_URL}users/sign-up`,
                body,
                options,
            )
            console.log('userDB', userDB);
            dispatch(creatingUser(userDB.data.userDB))
            resolve(userDB.data.userDB)
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response);
            let errorCode = 'An error occurred, probably the email already exists, choose another one'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message &&
                error.response.data.error &&
                error.response.data.error.message
            ) {
                errorCode = error.response.data.error.message
            } else if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(creatingUser(null))
            reject(errorCode)
        }
    })
}

export const loginUser = body => dispatch => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDB = await axios.post(`${SERVICE_URL}users/sign-in`,
                body,
                options,
            )
            dispatch(logingUser(userDB.data.userDB))
            resolve(userDB.data.userDB)
        } catch (error) {
            let errorCode = 'User or password is incorrect'
            if (
                error &&
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                errorCode = error.response.data.message
            }
            dispatch(logingUser(null))
            reject(errorCode)
        }
    })
}

export const logoutUser = () => dispatch => {
    dispatch(logingUser(null))
}
