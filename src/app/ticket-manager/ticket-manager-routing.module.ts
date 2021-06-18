import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketManagerPage } from './ticket-manager.page';

const routes: Routes = [
  {
    path: '',
    component: TicketManagerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketManagerPageRoutingModule {}
