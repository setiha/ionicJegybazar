import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketManagerPage } from './ticket-manager.page';
import {TicketManagerPageRoutingModule} from "./ticket-manager-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TicketManagerPage }]),
    TicketManagerPageRoutingModule
  ],
  declarations: [TicketManagerPage]
})
export class TicketManagerPageModule {}
