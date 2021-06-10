import {Component, OnInit} from '@angular/core';
import {createAnimation, IonRouterOutlet, NavController, NavParams} from "@ionic/angular";
import {TicketServiceService} from "../shared/ticket-service.service";
import {ShowDatePipe} from "../pipes/show-date.pipe";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  ticketList = [];
  pipe;
  constructor(private navCtr: NavController,
              public ticketService: TicketServiceService) {
  }

  ngOnInit() {

    this.ticketService.getAllTicket().valueChanges().subscribe(
      tickets => {
        this.ticketList = tickets
      });

  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);

  }

}
