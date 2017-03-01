import { IAppState } from './store/Istate';


import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';

import { store$,Store } from './store/index';

@inject(store$)
export class App {

  router: Router;
  private storeUnsub;
  private isLoading = false;

  constructor(public store$: Store) {

    this.storeUnsub = this.store$.subscribe((data:IAppState) => {
      this.isLoading = data.isLoading;
    })
  }
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'no-selection', title: 'Select' },
      { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' },
      // { route: 'gituser/:id',  moduleId: 'gituser-detail', name:'contacts' },
    ]);

    this.router = router;
  }
};
