import { IAction, IAppState, IFbContact } from './../Istate';
import { FbAction } from '../action/fb';

const INITIAL_STATE = {
    contacts: [],
};

export function fbReducer(state = INITIAL_STATE, action: IAction) {
    let newState = null;
    switch (action.type) {

        case FbAction.ADD:
            newState = [...state.contacts, action.payload];
            // newState.push(action.payload);
            return Object.assign({}, state, { contacts: newState ,isLoading:false});

        case FbAction.UPDATE:
            // console.info('catch action from epic: update', action.payload)
            debugger;
            let update = state.contacts.map((el) => {
                if (el.id === action.payload.id) {
                    return action.payload;
                }
                return el;
            })
            return Object.assign({}, state, { contacts: update, isLoading: false });

        case FbAction.DEL:
            console.info('catch action from epic: del', action.payload)
            return Object.assign({}, state);

        default:
            return state;
    }
}