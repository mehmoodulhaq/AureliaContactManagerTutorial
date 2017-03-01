
export class FbAction {

    static SYNCCONTACTS = 'SYNCCONTACTS';
    static ADD = 'ADD';
    static UPDATE = 'UPDATE';
    static DEL = 'DEL';

    static asyncContacts() {
        return {
            type: FbAction.SYNCCONTACTS
        };
    }
}
