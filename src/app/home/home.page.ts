import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {createAnimation, NavController, NavParams} from "@ionic/angular";
import {EventService} from "../shared/event.service";
import {UserService} from "../shared/user.service";
import {loginDataModel} from "../shared/loginDataModel";
import {EventModel} from "../shared/event-model";
import {Observable, Observer, ReplaySubject} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  eventIds = [];
  public eventList = [];
  public event$ = new Observable();

  constructor(public navCtr: NavController,
              public eventService: EventService,
              public userService: UserService,
              public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvent().snapshotChanges().subscribe(value => value.map(val => this.eventIds.push(val.key)));
    this.eventService.getAllEvent().valueChanges().subscribe(
      events => {
        this.eventList = events
      });
  }

  logOut() {
    this.userService.currentUser = new loginDataModel();
    this.userService.loginSubject.next(this.userService.currentUser);
    localStorage.clear();
    this.navCtr.navigateRoot('tabs/login').then(value => value)
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);
  }


  openEventManager() {
    this.eventService.isNewEvent.next(true);
    this.navCtr.navigateRoot('tabs/event-manager').then(value => value);
    this.eventService.event.next(new EventModel());

  }

  updateEvent(eventCard) {
    this.eventService.isNewEvent.next(false);
    this.navCtr.navigateRoot('tabs/event-manager').then(value => value);
    this.eventService.event.next(eventCard);

  }

}
