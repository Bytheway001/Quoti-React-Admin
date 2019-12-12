import { API } from "../utils";
import Axios from "axios";

/** Action Types */
export const USER_LIST_REQUESTED = 'USER_LIST_REQUESTED';
export const USER_LIST_SUCCEEDED = 'USER_LIST_SUCCEEDED';
export const USER_LIST_FAILED = 'USER_LIST_FAILED';

export const USER_INFO_REQUESTED = 'USER_REQUESTED';
export const USER_INFO_SUCCEEDED = 'USER_INFO_SUCCEEDED';
export const USER_INFO_FAILED = "USER_INFO_FAILED";

export const USER_UPDATE_REQUESTED = 'USER_UPDATE_REQUESTED';
export const USER_UPDATE_SUCCEEDED = "USER_UPDATE_SUCCEEDED";
export const USER_UPDATE_FAILED = "USER_UPDATE_FAILED";

export const USER_CREATE_REQUESTED = "USER_CREATE_REQUESTED";
export const USER_CREATE_SUCCEEDED = "USER_CREATE_SUCCEEDED";
export const USER_CREATE_FAILED = "USER_CREATE_FAILED";

export const USER_DELETE_REQUESTED = "USER_DELETE_REQUESTED";
export const USER_DELETE_SUCCEEDED = "USER_DELETE_SUCCEEDED";
export const USER_DELETE_FAILED = 'USER_DELETE_FAILED';

export const CLEAR_USER_INFO = "CLEAR_USER_INFO";


/** Action Creators */

export const onUserListRequested = () => ({ type: USER_LIST_REQUESTED });
export const onUserListSucceeded = (userlist) => ({ type: USER_LIST_SUCCEEDED, list: userlist })
export const onUserListFailed = () => ({ type: USER_LIST_FAILED });

export const onUserInfoRequested = (id) => ({ type: USER_INFO_REQUESTED })
export const onUserInfoSucceeded = (user) => ({ type: USER_INFO_SUCCEEDED, user })
export const onUserInfoFailed = () => ({ type: USER_INFO_FAILED })

export const onUserCreateRequested = () => ({ type: USER_CREATE_REQUESTED });
export const onUserCreateSucceeded = () => ({ type: USER_CREATE_SUCCEEDED });
export const onUserCreateFailed = () => ({ type: USER_CREATE_FAILED });

export const onUserUpdateRequested = () => ({ type: USER_UPDATE_REQUESTED });
export const onUserUpdateSucceeded = () => ({ type: USER_UPDATE_SUCCEEDED });
export const onUserUpdateFailed = () => ({ type: USER_UPDATE_FAILED })

export const onUserDeleteRequested = () => ({ type: USER_DELETE_REQUESTED });
export const onUserDeleteSucceeded = (id) => ({ type: USER_DELETE_SUCCEEDED, id: id });
export const onUserDeleteFailed = () => ({ type: USER_DELETE_FAILED });

export const onClearUserInfo = () => ({ type: CLEAR_USER_INFO })
/* Actions */

export const getUserList = () => {
    return dispatch => {
        dispatch(onUserListRequested())
        Axios.get(API + 'users').then(res => res.data)
            .then(result => {
                dispatch(onUserListSucceeded(result.data))
            })
    }
}

export const getUserInfo = (id) => {
    return dispatch => {
        dispatch(onUserInfoRequested())
        Axios.get(API + 'users/' + id).then(res => res.data)
            .then(result => {
                dispatch(onUserInfoSucceeded(result.data))
            })
    }
}

export const createUser = (email, first_name,last_name, role, enabled,license, regions, countries) => {
    return dispatch => {
        dispatch(onUserCreateRequested());
        Axios.post(API + 'users', { email, first_name, last_name, role, enabled, regions, countries,license }).then(res => {
            dispatch(onUserCreateSucceeded(res.data))
        })
    }
}

export const updateUser = (id, email, first_name,last_name, role, enabled,license, regions, countries) => {
    return dispatch => {
        dispatch(onUserCreateRequested());
        Axios.put(API + 'users/' + id, { email, first_name, last_name, role, enabled, regions, countries,license }).then(res => {
            dispatch(onUserCreateSucceeded(res.data))
        })
    }
}

export const deleteUser = (id) => {

    return dispatch => {
        if (window.confirm('Seguro desea eliminar este usuario?')) {
            dispatch(onUserDeleteRequested());
            Axios.delete(API + 'users/' + id).then(res => {
                dispatch(onUserDeleteSucceeded(id))
            })
        }
    }
}

export const clearUserInfo = () => {
    return dispatch => {
        dispatch(onClearUserInfo())
    }
}

/** Initial State */
const initialState = {
    list: [],
    regions: [],
    countries: [],
    fetchingList: false,
    editing: {}
}

/** Reducer */

function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LIST_REQUESTED:
            return {
                ...state,
                fetchingList: true
            }
        case USER_LIST_SUCCEEDED:
            return {
                ...state,
                fetchingList: false,
                list: action.list
            }
        case USER_LIST_FAILED:
            return {
                ...state,
                fetchingList: false
            }
        case USER_INFO_REQUESTED:
            return {
                ...state,
                fetchingList: true,
            }
        case USER_INFO_SUCCEEDED:
            return {
                ...state,
                fetchingList: false,
                editing: action.user
            }
        case USER_INFO_FAILED:
            return {
                ...state,
                fetchingList: false
            }
        case CLEAR_USER_INFO:
            return {
                ...state,
                editing: {}
            }
        case USER_CREATE_REQUESTED:
            return {
                ...state
            }
        case USER_CREATE_SUCCEEDED:
            return {
                ...state
            }
        case USER_CREATE_FAILED:
            return {
                ...state
            }
        case USER_UPDATE_REQUESTED:
            return state
        case USER_UPDATE_SUCCEEDED:
            return state
        case USER_UPDATE_FAILED:
            return state
        case USER_DELETE_REQUESTED:
            return state
        case USER_DELETE_SUCCEEDED:
            return {
                ...state,
                list:state.list.filter(x=>x.id!==action.id)
            }
        case USER_DELETE_FAILED:
            return state
        default:
            return state;
    }
}

const FormInitialState = {
    id: null,
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    enabled: 0
}
export function userFormReducer(state = FormInitialState) {

}

export default userReducer