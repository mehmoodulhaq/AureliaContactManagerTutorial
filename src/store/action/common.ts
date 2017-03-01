
import {IAction} from '../Istate';

export class commonActions {
    
    static TOGGLE : string = 'Togle loading flag';
    
    static toggleLoading(payload = false):IAction {
        return {
            type: commonActions.TOGGLE,
            payload:payload
        };
    }

}
