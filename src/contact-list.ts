
import { EventAggregator } from 'aurelia-event-aggregator';
import { IAppState, IAction, IFbContact } from './store/Istate';
import { ContactUpdated, ContactViewed } from './messages';
import { inject } from 'aurelia-framework';


import { Router, RouterConfiguration } from 'aurelia-router';

import { Observable } from 'rxjs/Observable';
import { qFire, QFire } from './service/qFire';
import { store$, GitAction, FbAction, Store, commonActions } from './store/index';
import 'rxjs/add/operator/pluck';
import * as firebase from 'firebase';

@inject( EventAggregator, store$, qFire)
export class ContactList {
  contacts;
  selectedId = 0;
  private storeUnsub: any
  constructor(
    ea: EventAggregator,
    private store$: Store,
    private qFire: QFire
  ) {
    
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.store$.dispatch(commonActions.toggleLoading(true))
    this.store$.dispatch(FbAction.asyncContacts());
    this.storeUnsub = this.store$
      .pluck('contacts')
      .subscribe((contacts: boolean) => {
        this.contacts = contacts
      })
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}