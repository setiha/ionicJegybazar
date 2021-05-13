import { Component, OnInit } from '@angular/core';
import {TicketPage} from "../ticket/ticket.page";
import {createAnimation, NavController} from "@ionic/angular";

@Component({
  selector: 'app-sell-ticket',
  templateUrl: './sell-ticket.page.html',
  styleUrls: ['./sell-ticket.page.scss'],
})
export class SellTicketPage implements OnInit {
  constructor(private navCtr: NavController) {
  }

  ngOnInit() {
  }

  clickOnkBackButton() {
    const  animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back())

  }
}
