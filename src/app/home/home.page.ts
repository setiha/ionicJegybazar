import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertController, createAnimation, NavController, NavParams} from "@ionic/angular";
import {EventService} from "../shared/event.service";
import {UserService} from "../shared/user.service";
import {loginDataModel} from "../shared/loginDataModel";
import {EventModel} from "../shared/event-model";
import {Observable, Observer, ReplaySubject} from "rxjs";
import {TicketServiceService} from "../shared/ticket-service.service";
import firebase from "firebase";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  eventIds = [];
  public eventList = [];
  public event$ = new Observable();
  storage: any;
  constructor(public navCtr: NavController,
              public eventService: EventService,
              public userService: UserService,
              public navParams: NavParams,
              public alertController: AlertController,
              public ticketService: TicketServiceService) {
    this.storage = firebase.storage().ref();
  }

  ngOnInit(): void {
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
  delete(ev) {
    this.eventService.delete(ev);
    this.ticketService.getAllTicketForDelete(ev)
    this.storage.storage.refFromURL(ev.pictureURL).delete().then(value => value);
  }

  async presentAlert(ev) {
    const alert = await this.alertController.create({
      cssClass: 'deleteEvents',
      header: 'Alert',
      message: 'Biztos h torlod az esemenyt?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ],
    });

    await alert.present();
    await alert.onDidDismiss().then(resp => {
      if(resp.role == 'cancel'){
        return
      }else{
        this.delete(ev)
      }
    })
  }
}
