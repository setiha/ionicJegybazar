import { Component, OnInit } from '@angular/core';
import {createAnimation, NavController} from "@ionic/angular";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(public navCtr: NavController) { }

  ngOnInit() {

  }
  clickOnkBackButton() {
    const  animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);

    animation.play().then(r => this.navCtr.back()).then(animation.stop);


  }
}
