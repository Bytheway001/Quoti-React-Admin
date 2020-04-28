//********************************************************ACTION TYPES******************************************* */

import { API } from "../utils"
import Axios from "axios"

// INDEX
export const CRUD_LIST_REQUESTED = "CRUD_LIST_REQUESTED"
export const CRUD_LIST_SUCCEEDED = "CRUD_LIST_SUCCEEDED"
export const CRUD_LIST_FAILED = "CRUD_LIST_FAILED"
// SHOW
export const CRUD_SHOW_REQUESTED = "CRUD_SHOW_REQUESTED"
export const CRUD_SHOW_SUCCEEDED = "CRUD_SHOW_SUCCEEDED"
export const CRUD_SHOW_FAILED = "CRUD_SHOW_FAILED"
// CREATE
export const CRUD_CREATE_REQUESTED = "CRUD_CREATE_REQUESTED"
export const CRUD_CREATE_SUCCEEDED = "CRUD_CREATE_SUCCEEDED"
export const CRUD_CREATE_FAILED = "CRUD_CREATE_FAILED"
// UPDATE
export const CRUD_UPDATE_REQUESTED = "CRUD_UPDATE_REQUESTED"
export const CRUD_UPDATE_SUCCEEDED = "CRUD_UPDATE_SUCCEEDED"
export const CRUD_UPDATE_FAILED = "CRUD_UPDATE_FAILED"
// DELETE
export const CRUD_DELETE_REQUESTED = "CRUD_DELETE_REQUESTED"
export const CRUD_DELETE_SUCCEEDED = "CRUD_DELETE_SUCCEEDED"
export const CRUD_DELETE_FAILED = "CRUD_DELETE_FAILED"
//********************************************************** ACTION CREATORS *********************************** */
// Index
export const onCrudListRequested = () => ({ type: CRUD_LIST_REQUESTED })
export const onCrudListSucceeded = (data) => ({ type: CRUD_LIST_SUCCEEDED,payload:data })
export const onCrudListFailed = () => ({ type: CRUD_LIST_FAILED })
// Show
export const onCrudShowRequested = () => ({ type: CRUD_SHOW_REQUESTED })
export const onCrudShowSucceeded = () => ({ type: CRUD_SHOW_SUCCEEDED })
export const onCrudShowFailed = () => ({ type: CRUD_SHOW_FAILED })
// Create
export const onCrudCreateRequested = () => ({ type: CRUD_SHOW_REQUESTED })
export const onCrudCreateSucceeded = () => ({ type: CRUD_SHOW_SUCCEEDED })
export const onCrudCreateFailed = () => ({ type: CRUD_SHOW_FAILED })
// Update
export const onCrudUpdateRequested = () => ({ type: CRUD_SHOW_REQUESTED })
export const onCrudUpdateSucceeded = () => ({ type: CRUD_SHOW_SUCCEEDED })
export const onCrudUpdateFailed = () => ({ type: CRUD_SHOW_FAILED })
// Delete
export const onCrudDeleteRequested = () => ({ type: CRUD_SHOW_REQUESTED })
export const onCrudDeleteSucceeded = () => ({ type: CRUD_SHOW_SUCCEEDED })
export const onCrudDeleteFailed = () => ({ type: CRUD_SHOW_FAILED })
//********************************************************** ACTIONS ************************************************** */

export const crudList = (resourceName) => {
    return dispatch => {
        dispatch(onCrudListRequested())
        Axios.get(`${API}${resourceName}`).then(res => {
            dispatch(onCrudListSucceeded(res.data.data))
        })
            .catch(err => {
                console.log(err)
                dispatch(onCrudListFailed(err.response.data))
            })
    }
}

export const crudShow = (resourceName, id) => {

}

export const crudCreate = (resourceName, data) => {

}

export const crudUpdate = (resourceName, data) => {

}

export const crudDelete = (resourceName, id) => {

}
/******************************* CRUD REDUCER */
const initialState = {
    list: [],
    selected: {},
    loading: false
}

export const crudReducer = (state = initialState, action) => {
    switch (action.type) {
        case CRUD_LIST_REQUESTED:
            return { ...state, loading: true }
        case CRUD_LIST_SUCCEEDED:
            return { ...state, list: action.payload, loading: false }
        case CRUD_LIST_FAILED:
            return { ...state, loading: false }
        default:
            return state
    }
}
