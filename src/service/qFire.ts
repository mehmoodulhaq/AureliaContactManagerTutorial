import { IFbContact } from './../store/Istate';
import { Observable, Subject } from "rxjs/Rx";
import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDU-1zu1Nl8QS7UbErkVC0XSUDyOmHKSfw",
    authDomain: "aureliatestapp.firebaseapp.com",
    databaseURL: "https://aureliatestapp.firebaseio.com",
    storageBucket: "aureliatestapp.appspot.com",
    messagingSenderId: "753462770305"
};
// debugger;
firebase.initializeApp(config);

export class QFire {

    public mainRef = firebase.database().ref('/');

    node: string = null;
    Obj: any = {};

    constructor() {

        console.log('FirebaseService Constructor node: ');
    }

    child_added(child_added$) {
        this.mainRef.child(this.node).on('child_added', (snapshot: any) => {
            this.setVariables(snapshot.val(), snapshot.key, 'added', child_added$);
        });
    }

    child_changed(child_changed$) {
        this.mainRef.child(this.node).on('child_changed', (snapshot: any) => {
            this.setVariables(snapshot.val(), snapshot.key, 'changed', child_changed$);
        });
    }

    child_removed(child_removed$) {
        this.mainRef.child(this.node).on('child_removed', (snapshot: any) => {
            this.setVariables(snapshot.val(), snapshot.key, 'removed', child_removed$);
        });
    }


    setVariables(obj: any, key: string, evnt: string, subject) {
        let _obj = null;

        if (evnt == 'added' || 'changed') {
            _obj = Object.assign({}, obj);
            _obj['$key'] = key;
        }

        // on child_added
        if (evnt == 'added') {
            this.Obj[key] = _obj;

            _obj['child_added'] = true;
            subject.next(_obj);
        }

        // on child_changed
        if (evnt == 'changed') {
            this.Obj[key] = _obj;
            
            _obj['child_changed'] = true;
            subject.next(_obj)
        }

        // on child_removed
        if (evnt == 'removed') {
            delete this.Obj[key];

            subject.next(key);
        }

        _obj = null;
    }

    list(node: string) {
        // before events close/off registered all events
        this.mainRef.child(node).off();
        this.node = node;

        let child_added$ = new Subject();
        let child_changed$ = new Subject();
        let child_removed$ = new Subject();


        this.child_added(child_added$);
        this.child_changed(child_changed$);
        this.child_removed(child_removed$);
        return Observable.merge(child_added$, child_changed$, child_removed$);
    }

    updateContacts(contact: IFbContact) {
        let key = contact.$key;
        delete contact.$key;
        return this.mainRef.child(`contacts/${key}`).update(contact)
    }

}


export let qFire = new QFire();

