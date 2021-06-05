import {Component, ElementRef, OnInit} from '@angular/core';
import {createAnimation, NavController, NavParams, ToastController} from "@ionic/angular";
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
  toastMessage: string;
  chooseFile;
  eventKeyList: object[] = [
    {key: 'name', label: 'Nev'},
    {key: 'date', label: 'Datum'},
    {key: 'pictureURL', label: 'Kep'},
    {key: 'description', label: 'Leiras'},
  ];

  constructor(public navCtr: NavController,
              public eventService: EventService,
              public toastController: ToastController) {

  }

  ngOnInit() {
    this.isNewEvent = true;
    this.eventHandler();
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
    this.presentToast(this.toastMessage, () => this.navCtr.navigateRoot('tabs/home').then(value => value), 'top').then(value => this.newEventModel = new EventModel());

  }

  async presentToast(message: string, callBack: any = 0, position: any) {
    const toast = await this.toastController.create({
      message: message,
      position: position,
      duration: 1000
    });
    await toast.present();
    await toast.onDidDismiss().then(resp => {
      if (callBack) {
        callBack();
      }
    });
  }

  eventHandler() {
    this.eventService.event.subscribe(
      value => this.newEventModel = value
    );
    this.eventService.isNewEvent.subscribe(
      event => {
        this.isNewEvent = event;
        if (!this.isNewEvent) {

          this.toastMessage = 'Esemeny frissitve';
        } else {
          this.toastMessage = 'Esemeny mentve';
        }
      }
    );
  }

  fileChoose() {
    let chooser = (<HTMLInputElement>document.querySelector("#native-file-chooser"));
    let file = chooser.files[0];
    let reader:any = new FileReader();
    reader.addEventListener("load", () => {
      this.newEventModel.pictureURL = reader.result;
    }, false);
    if (file) {
      reader.readAsDataURL(file);

    }

  }
}
