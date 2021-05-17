import {Component, OnInit} from '@angular/core';
import {createAnimation, IonRouterOutlet, NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage {

  constructor(private navCtr: NavController) {
  }
  clickOnkBackButton() {
    const  animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);

  }

}
