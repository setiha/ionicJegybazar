import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketPageRoutingModule } from './ticket-routing.module';

import { TicketPage } from './ticket.page';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TicketPage }]),
    TicketPageRoutingModule
  ],
  declarations: [TicketPage]
})
export class TicketPageModule {}
