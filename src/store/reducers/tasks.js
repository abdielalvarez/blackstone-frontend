import { GET_TASKS, GET_TASK, UPDATE_TASK, DELETE_TASK } from "../actions/tasks";

const initialState = {
    tasks: [],
    task: {
        name: '',
        content: '',
    }
}

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.data
            }
        case GET_TASK:
            return {
                ...state,
                task: action.data ? action.data : {
                    name: '',
                    content: '',
                }
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: action.data,
                task: {
                    name: '',
                    content: ''
                }
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: action.data,
            }
        default:
        return state;
    }
}