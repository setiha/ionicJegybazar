import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";
import {TicketPage} from "../ticket/ticket.page";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  ticket = TicketPage;

  constructor(private navCtrl: NavController) {
    console.log(this.navCtrl);
  }

}
