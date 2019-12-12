import { API } from "../utils";
import Axios from "axios";

/** Action Types */
export const COUNTRY_LIST_REQUESTED = 'COUNTRY_LIST_REQUESTED';
export const COUNTRY_LIST_SUCCEEDED = 'COUNTRY_LIST_SUCCEEDED';
export const COUNTRY_LIST_FAILED = 'COUNTRY_LIST_FAILED';

export const COUNTRY_INFO_REQUESTED = 'COUNTRY_INFO_REQUESTED';
export const COUNTRY_INFO_SUCCEEDED = 'COUNTRY_INFO_SUCCEEDED';
export const COUNTRY_INFO_FAILED = "COUNTRY_INFO_FAILED";

export const COUNTRY_UPDATE_REQUESTED = 'COUNTRY_UPDATE_REQUESTED';
export const COUNTRY_UPDATE_SUCCEEDED = "COUNTRY_UPDATE_SUCCEEDED";
export const COUNTRY_UPDATE_FAILED = "COUNTRY_UPDATE_FAILED";


/** Action Creators */

export const onCountryListRequested = () => ({ type: COUNTRY_LIST_REQUESTED });
export const onCountryListSucceeded = (countryList) => ({ type: COUNTRY_LIST_SUCCEEDED, list:countryList })
export const onCountryListFailed = () => ({ type: COUNTRY_LIST_FAILED });


/* Actions */

export const getCountryList = ()=>{
    return dispatch=>{
        dispatch(onCountryListRequested())
        Axios.get(API + 'countries').then(res => res.data)
            .then(result => {
                   dispatch(onCountryListSucceeded(result.data))
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

function CountryReducer(state = initialState, action) {
    switch (action.type) {
        case COUNTRY_LIST_REQUESTED:
            return {
                ...state,
                fetchingList: true
            }
        case COUNTRY_LIST_SUCCEEDED:
            return {
                ...state,
                fetchingList:false,
                list:action.list
            }
        case COUNTRY_LIST_FAILED:
            return {
                ...state,
                fetchingList:false
            }
        default:
            return state;
    }
}

export default CountryReducer