import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketPageRoutingModule } from './ticket-routing.module';

import { TicketPage } from './ticket.page';
import {ExploreContainerComponentModule} from "../explore-container/explore-container.module";
import {RouterModule} from "@angular/router";
import {Tab3Page} from "../tab3/tab3.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPageRoutingModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TicketPage }]),
    TicketPageRoutingModule
  ],
  declarations: [TicketPage]
})
export class TicketPageModule {}
