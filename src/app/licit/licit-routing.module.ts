import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitPage } from './licit.page';

const routes: Routes = [
  {
    path: '',
    component: LicitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicitPageRoutingModule {}
