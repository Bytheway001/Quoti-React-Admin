import { API } from "../utils";
import Axios from "axios";

/** Action Types */
export const REGION_LIST_REQUESTED = 'REGION_LIST_REQUESTED';
export const REGION_LIST_SUCCEEDED = 'REGION_LIST_SUCCEEDED';
export const REGION_LIST_FAILED = 'REGION_LIST_FAILED';

export const REGION_INFO_REQUESTED = 'REGION_INFO_REQUESTED';
export const REGION_INFO_SUCCEEDED = 'REGION_INFO_SUCCEEDED';
export const REGION_INFO_FAILED = "REGION_INFO_FAILED";

export const REGION_UPDATE_REQUESTED = 'REGION_UPDATE_REQUESTED';
export const REGION_UPDATE_SUCCEEDED = "REGION_UPDATE_SUCCEEDED";
export const REGION_UPDATE_FAILED = "REGION_UPDATE_FAILED";

/** Action Creators */
export const onRegionListRequested = () => ({ type: REGION_LIST_REQUESTED });
export const onRegionListSucceeded = (regionList) => ({ type: REGION_LIST_SUCCEEDED, list:regionList })
export const onRegionListFailed = () => ({ type: REGION_LIST_FAILED });


/* Actions */
export const getRegionList = ()=>{
    return dispatch=>{
        dispatch(onRegionListRequested())
        Axios.get(API + 'regions').then(res => res.data)
            .then(result => {
                   dispatch(onRegionListSucceeded(result.data))
            })
    }
}

/** Initial State */
const initialState = {
    list: [],
    current: {},
    fetchingList: false,
}

/** Reducer */

function RegionReducer(state = initialState, action) {
    switch (action.type) {
        case REGION_LIST_REQUESTED:
            return {
                ...state,
                fetchingList: true
            }
        case REGION_LIST_SUCCEEDED:
            return {
                ...state,
                fetchingList:false,
                list:action.list
            }
        case REGION_LIST_FAILED:
            return {
                ...state,
                fetchingList:false
            }
        default:
            return state;
    }
}

export default RegionReducer