
import { IAction } from '../Istate';
import { commonActions } from './../action/common';


const INITIAL_STATE  = {
   isLoading:false
};

export function loadingReducer(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {
        case commonActions.TOGGLE:
            console.log(action.payload)
            return Object.assign({}, state, {isLoading: action.payload});
        default:
            return state;
    }
}