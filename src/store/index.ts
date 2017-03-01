import { IAppState, IAction } from './Istate';


// https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html
import {BehaviorSubject} from 'rxjs'
import { createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {FbAction} from './action/fb';
import {GitAction} from './action/git';
import {commonActions} from './action/common'

// epics
import { gitEpic } from './epic/git';
import { fbEpic } from './epic/fb';

// Application Epics / Effects
const rootEpic = combineEpics(
    gitEpic.getUserData,
    fbEpic.getUserData
);

import {rootReducer} from './Istate'
const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

// let _store = createStoreWithMiddleware(rootReducer);


class Store extends BehaviorSubject<IAppState> {

    store = createStoreWithMiddleware(rootReducer);
    constructor(obj:IAppState = {
        contacts:[],
        isLoading:false,
        userData:{}
    }){
        super(obj);
        
        this.store.subscribe(()=>{
            this.next(this.store.getState())
        })
        this.next(this.store.getState())
    }
    next(data:IAppState){
        super.next(data)
    }

    public dispatch(arg:IAction){
        // debugger;
        this.store.dispatch(arg)
    }

    public getState(){
        return this.store.getState()
    }
}
let store$ = new Store()

export {store$, Store, FbAction, GitAction, commonActions}
