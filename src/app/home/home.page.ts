import {Component, OnInit} from '@angular/core';
import {createAnimation, NavController} from "@ionic/angular";
import {EventService} from "../shared/event.service";
import {EventModel} from "../shared/event-model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
private eventList = [];
  constructor(public navCtr: NavController,
              public eventService: EventService) {}
  ngOnInit(): void {
this.eventService.getAllEvent().subscribe(
  events => {
    this.eventList = events
    console.log(events);
  }
)
  }

  clickOnkBackButton() {
    const  animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back());

  }

}
