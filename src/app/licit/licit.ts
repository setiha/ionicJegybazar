import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicitPageRoutingModule } from './licit-routing.module';

import { LicitPage } from './licit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicitPageRoutingModule
  ],
  declarations: [LicitPage]
})
export class SellTicketPageModule {}
