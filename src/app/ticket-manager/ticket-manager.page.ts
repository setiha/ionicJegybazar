import {Component, Input, OnInit, Output} from '@angular/core';
import {createAnimation, NavController} from "@ionic/angular";
import {EventService} from "../shared/event.service";
import {EventModel} from "../shared/event-model";
import {TicketModel} from "../shared/ticket-model";
import {UserModel} from "../shared/user-model";
import {UserService} from "../shared/user.service";
import {TicketServiceService} from "../shared/ticket-service.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'ticket-manager.page.html',
  styleUrls: ['ticket-manager.page.scss']
})
export class TicketManagerPage implements OnInit {
  @Output() newEvent;
  newTicketModel: TicketModel = new TicketModel();
  eventList;

  ticketKeyList: object[] = [
    {key: 'numberOfTickets', label: 'A jegyek szama'},
    {key: 'minimalBidPrice', label: 'Min licit'},
    {key: 'bidStep', label: 'Licit lepcso'},
    {key: 'currentBid', label: 'A licit allasa'},
    {key: 'bidCounter', label: 'Licit szamlalo'},
    {key: 'bidEndDate', label: 'Licit vege'},
  ];


  constructor(public navCtr: NavController,
              public eventService: EventService,
              public userService: UserService,
              public ticketService: TicketServiceService) {
  }

  ngOnInit(): void {
    this.eventService.getAllEvent().valueChanges().subscribe(
      events => this.eventList = events);
    this.newTicketModel = new TicketModel();
    this.newTicketModel.currentBid = null;
    this.newTicketModel.bidCounter = null;
    this.userService.getCurrentUser().subscribe(
      user => this.newTicketModel.sellerUserId = user.id
    );
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);
  }
  onSubmit(event) {
    this.newEvent = '';
    this.newTicketModel.eventId = event.id;
    this.newTicketModel.event = event;
    this.ticketService.create(this.newTicketModel);
    this.navCtr.navigateRoot('tabs/ticket').then(value => this.newTicketModel = new TicketModel());

  }
select(event){
    console.log(event)
}
}
