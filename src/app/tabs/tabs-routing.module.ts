import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketPageModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('../ticket/ticket.module').then(m => m.TicketPageModule)
      },
      {
        path: 'sell-ticket',
        loadChildren: () => import('../sell-ticket/sell-ticket.module').then(m => m.SellTicketPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/contact',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/contact',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
