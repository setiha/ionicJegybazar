import {Component, OnInit} from '@angular/core';
import {createAnimation, NavController, NavParams} from "@ionic/angular";
import {EventModel} from "../shared/event-model";
import {EventService} from "../shared/event.service";

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.page.html',
  styleUrls: ['./event-manager.page.scss'],
})
export class EventManagerPage implements OnInit {
  newEventModel: EventModel = new EventModel();
  isNewEvent;
  eventKeyList: object[] = [
    {key: 'name', label: 'Nev'},
    {key: 'date', label: 'Datum'},
    {key: 'pictureURL', label: 'Kep'},
    {key: 'description', label: 'Leiras'},
  ];

  constructor(public navCtr: NavController,
              public eventService: EventService,
              public navParams: NavParams) {

  }

  ngOnInit() {
    this.eventService.event.subscribe(
      value => this.newEventModel = value
    );
    this.eventService.isNewEvent.subscribe(
      event => this.isNewEvent = event
    );
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);
  }

  saveNewEvent() {
    this.eventService.save(this.newEventModel);
    this.newEventModel = new EventModel();
    this.navCtr.navigateRoot('tabs/home').then(value => value);
  }
}
