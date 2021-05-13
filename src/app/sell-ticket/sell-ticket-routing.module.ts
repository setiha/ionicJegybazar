import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellTicketPage } from './sell-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: SellTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellTicketPageRoutingModule {}
