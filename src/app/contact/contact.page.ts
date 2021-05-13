import {Component} from '@angular/core';
import {NavController, NavParams} from "@ionic/angular";
import {NavigationOptions} from "@ionic/angular/providers/nav-controller";
import { createAnimation } from "@ionic/angular"
@Component({
  selector: 'app-tab1',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {

  constructor(public navCtr: NavController) {
  }

  clickOnkBackButton() {
    const  animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back())

  }

}
