import {Component, OnInit} from '@angular/core';
import {createAnimation, IonRouterOutlet, NavController, NavParams} from "@ionic/angular";
import {TicketServiceService} from "../shared/ticket-service.service";
import {ShowDatePipe} from "../pipes/show-date.pipe";
import {EventService} from "../shared/event.service";
import {EventModel} from "../shared/event-model";
import {ReplaySubject, Subject} from "rxjs";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  ticketList = [];
  pipe;
  pictures = {};
  constructor(private navCtr: NavController,
              public ticketService: TicketServiceService,
              public eventService: EventService) {

  }

  ngOnInit() {
    this.eventService.getAllEvent().valueChanges().subscribe(
      (events:any) => events.map(
        (event:any) => {
          this.pictures[event.id]= event.pictureURL;
        }
      )
    );
    this.ticketService.getAllTicket().valueChanges().subscribe(
      tickets => {
        this.ticketList = tickets
      });
  }

  getPicture(id) {
    return this.pictures[id];
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);

  }

}
