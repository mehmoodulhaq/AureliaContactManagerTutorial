
import { IFbContact } from './store/Istate';
import { qFire, QFire } from './service/qFire';
import { store$, Store, commonActions } from './store/index'
import 'rxjs/add/operator/pluck'
import { Observable } from 'rxjs/Observable'

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactUpdated, ContactViewed } from './messages';
import { areEqual } from './utility';
import * as firebase from 'firebase';

@inject(EventAggregator, qFire, store$)
export class ContactDetail {
  routeConfig;
  contact: IFbContact;
  originalContact: IFbContact;
  private unsub;

  constructor(
    private ea: EventAggregator
    , private qFire: QFire
    , private store$: Store
  ) { }


  /*life-cycle methods for routed components. 
      activate is one such method and it gets invoked 
      right before the router is about to activate the 
      component. This is also how the router passes the 
      component its route parameters*/

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.unsub = this.store$.pluck('contacts').mergeMap((contacts: Array<IFbContact>) => {
      return Observable.from(contacts).filter((contact: IFbContact) => contact && contact.id == params.id)
    })
      .subscribe((contact: IFbContact) => {
        if (Object.keys(contact).length) {
          let temp = JSON.stringify(contact)
          this.contact = <IFbContact>(JSON.parse(temp))
          this.routeConfig.navModel.setTitle(this.contact.firstName);
          this.originalContact = <IFbContact>(JSON.parse(temp));
          this.ea.publish(new ContactViewed(this.contact));
        }

      })
    return false;
  }

  get canSave() {
    return this.contact && this.contact.firstName && this.contact.lastName/* && !this.api.isRequesting*/; // to
  }

  save() {

    // this.store$.dispatch(commonActions.toggleLoading(true)) // todo: will check later
    this.qFire.updateContacts(this.contact).then(contact => {

      this.routeConfig.navModel.setTitle(this.contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {

        this.ea.publish(new ContactViewed(this.contact));

      } else {

      }

      return result;
    }

    return true;
  }
}


