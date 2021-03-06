import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'licit',
        loadChildren: () => import('../licit/licit').then(m => m.SellTicketPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'event-manager',
        loadChildren: () => import('../event-manager/event-manager.module').then(m => m.EventManagerPageModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketPageModule)
      },
      {
        path: 'ticket-manager',
        loadChildren: () => import('../ticket-manager/ticket-manager.module').then(m => m.TicketManagerPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
