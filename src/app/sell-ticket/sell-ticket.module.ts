import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellTicketPageRoutingModule } from './sell-ticket-routing.module';

import { SellTicketPage } from './sell-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellTicketPageRoutingModule
  ],
  declarations: [SellTicketPage]
})
export class SellTicketPageModule {}
