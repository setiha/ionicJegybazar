import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventManagerPage } from './event-manager.page';

const routes: Routes = [
  {
    path: '',
    component: EventManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventManagerPageRoutingModule {}
