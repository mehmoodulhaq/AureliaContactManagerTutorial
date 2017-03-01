import { GitAction } from '../action/git';
import { IAction, IUserData, IAppState } from './../Istate';

const INITIAL_STATE = {
    userData: {}
};

export function gitReducer(state= INITIAL_STATE, action: IAction){
    switch (action.type) {
        case GitAction.GetDataFromUrl:
            return Object.assign({}, state, {isLoading: true});
        case GitAction.GetDataFromUrl_SUCCESS:
            return Object.assign({}, state, { userData: action.payload});
        default:
            return state;
    }
}