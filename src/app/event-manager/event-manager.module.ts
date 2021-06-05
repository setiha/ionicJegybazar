import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventManagerPageRoutingModule } from './event-manager-routing.module';

import { EventManagerPage } from './event-manager.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventManagerPageRoutingModule,
  ],
  declarations: [EventManagerPage],

})
export class EventManagerPageModule {}
