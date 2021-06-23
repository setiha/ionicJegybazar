import {Component, OnDestroy, OnInit} from '@angular/core';
import {createAnimation, NavController} from "@ionic/angular";
import {BehaviorSubject} from "rxjs";
import {TicketModel} from "../shared/ticket-model";
import {TicketPage} from "../ticket/ticket.page";
import {TicketServiceService} from "../shared/ticket-service.service";
import {EventModel} from "../shared/event-model";
import {UserModel} from "../shared/user-model";

@Component({
  selector: 'app-licit',
  templateUrl: './licit.page.html',
  styleUrls: ['./licit.page.scss'],
})
export class LicitPage implements OnInit {
  sellTicket: TicketModel = new TicketModel();
  seller;
  eventName;

  constructor(private navCtr: NavController,
              public ticketService: TicketServiceService) {

  }

  ngOnInit() {
    this.ticketService.sellTicket.subscribe(ticket => {
      this.seller = ticket.seller.name;
      this.eventName = ticket.event.name;
      this.sellTicket = ticket;
      }
    )
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back())
  }
}
