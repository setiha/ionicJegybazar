import {Component, OnInit} from '@angular/core';
import {IonRouterOutlet, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage {

  constructor(private navCtr: NavController) {
  }

  back() {
    this.navCtr.back();
  }
}
