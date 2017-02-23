// import {WebAPI} from './web-api';
// import {inject} from 'aurelia-framework';

// @inject(WebAPI)
// export class ContactList {
//   contacts;
//   selectedId = 0;

//   constructor(private api: WebAPI){
//     //   debugger;
//    }

//   created(){// life-cycle hook that gets called after both the view-model and the view are created
//     this.api.getContactList().then(contacts => {
//         // debugger;
//         return this.contacts = contacts
//     });
//   }

//   select(contact){
//     this.selectedId = contact.id;
//     return true;
//   }
// }

import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectedId = 0;

  constructor(private api: WebAPI, ea: EventAggregator){
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact){
    this.selectedId = contact.id;
    return true;
  }
}