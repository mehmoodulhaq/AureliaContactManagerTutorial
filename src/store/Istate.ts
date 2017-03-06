import { IUserData, IAppState, IAction } from './Istate';

import { createStore, applyMiddleware } from 'redux';

import { gitReducer } from './reducer/git';
import { fbReducer } from './reducer/fb';
import { loadingReducer } from './reducer/common';

export interface IFbContact { // todo: will complete later
    id?: number;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    $key?:string
}

export interface IUserData { // todo: will complete later
    id?: string;
}

export interface IAction {
    type: string;
    payload?: any;
}

// Application State IAppState
export interface IAppState {
    userData: IUserData,
    contacts: Array<IFbContact>,
    isLoading: boolean
}

function combineReducer(obj, initialState) {
    return (state: IAppState = initialState, action: IAction) => {
        let prevKey;
        return Object.keys(obj).reduce((accu, key) => {
            if (accu === undefined) throw new Error(`${prevKey}Reducer returned undefined`)
            prevKey = key;
            return obj[key](accu, action);
        }, Object.assign({},state));
    }
}
export const APPINITIALSTATE: IAppState = {
    contacts: [],
    isLoading: false,
    userData: {}
}
export const rootReducer = combineReducer({
    isLoading: loadingReducer,
    userData: gitReducer,
    contacts: fbReducer
}, APPINITIALSTATE)
