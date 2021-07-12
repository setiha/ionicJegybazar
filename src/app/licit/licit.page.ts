import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  HostListener,
  OnInit,
} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {TicketServiceService} from "../shared/ticket-service.service";
import {AlertController, NavController, createAnimation, ViewDidLeave} from "@ionic/angular";
import {Observable} from "rxjs";
import {TicketModel} from "../shared/ticket-model";
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";


@Component({
  selector: 'app-licit',
  templateUrl: './licit.page.html',
  styleUrls: ['./licit.page.scss'],
})


export class LicitPage implements OnInit, DoCheck, ViewDidLeave {
  allTickets = [];
  newTicketEventName = [];
  newTicketSeller = [];
  seller = '';
  sellTicket = new TicketModel();
  ticketEvent = '';
  oneTicket = false;
  licitCounter: number;
  timerCounter: boolean = true;
  licitClosed;
  chosenTickets = [];
  newSellerTicket = [];
  newNumberOfTickets = [];
  newMinTicketLicit = [];
  newTicketBidStep = [];
  newTicketCurrentBid = []
  newTicketBidCounter = [];
  newTicketBidEndDate = [];
  scrolling: boolean = false;
  allowRedirect: boolean;

  constructor(public ticketService: TicketServiceService,
              private navCtr: NavController,
              public afDb: AngularFireDatabase,
              public alertController: AlertController,
              public cdr: ChangeDetectorRef) {
    this.ticketService.getAllTicket().subscribe(
      tickets => {
        this.allTickets = tickets;
        this.allTickets.map(
          (newTicket, index) => {
            newTicket.seller = tickets[index].seller;
            newTicket.event = tickets[index].event;
            this.newTicketEventName.push(newTicket.event.name);
          }
        );
        console.log(localStorage.getItem('ticketId'));
      }
    )
  }

  ngOnInit(): void {

    if (localStorage.getItem('ticketId')) {
      this.licitInit();
    }
  }

  ngDoCheck() {
    if (this.scrolling) {
      setTimeout(
        () => {
          this.scrollToBottomContent();
          this.scrolling = false;
        }
      )
    }
    if (!localStorage.getItem('ticketId')
      && this.timerCounter == true) {
      setTimeout(() =>
        this.ticketService.getAllTicket().subscribe(
          tickets => {
            this.allTickets = tickets;
            this.allTickets.map(
              (newTicket, index) => {
                newTicket.seller = tickets[index].seller;
                newTicket.event = tickets[index].event;
                this.newTicketEventName.push(newTicket.event.name);
              }
            );
          }
        ));
      this.timerCounter = false;
    }
    if (this.ticketService.time == false && localStorage.getItem('ticketId')) {
      setTimeout(() => this.licitInit(), 1);
      this.ticketService.time = true;
      this.oneTicket = true;
    }
  }

  ionViewDidLeave(): void {
    this.oneTicket = false;
    localStorage.removeItem('ticketId');
    this.sellTicket = new TicketModel();
    this.ticketEvent = '';
  }

  canDeactivate(): boolean {
    return this.allowRedirect;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    // or directly false
    this.allowRedirect = false;
    console.log('faszom');
  }

  setTicketSeller(event) {
    this.seller = '';
    this.newTicketSeller = [];
    this.sellTicket.numberOfTickets = null;
    this.sellTicket.minimalBidPrice = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidStep = null;
    this.sellTicket.bidCounter = null;
    this.sellTicket.bidEndDate = null;
    this.newSellerTicket = [];
    this.newNumberOfTickets = [];
    this.newMinTicketLicit = [];
    this.newTicketBidStep = [];
    this.newTicketCurrentBid = [];
    this.newTicketBidCounter = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets = this.allTickets.filter(
      ticket =>
        ticket.event.name == event);
    console.log('chosenTickets', this.chosenTickets);
    this.chosenTickets.map(
      ticket => {
        if (ticket.event.name == event) {
          this.newTicketSeller.push(ticket.seller.name);
        }
      });
    this.getTicketSellerName();
  }

  setTicketNumberOfTickets(event) {
    this.sellTicket.numberOfTickets = null;
    this.sellTicket.minimalBidPrice = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidStep = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidEndDate = null;
    this.newNumberOfTickets = [];
    this.newMinTicketLicit = [];
    this.newTicketBidStep = [];
    this.newTicketCurrentBid = [];
    this.newTicketBidCounter = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.seller.name == event) {
          this.newNumberOfTickets.push(ticket.numberOfTickets);
        }
        this.getTicketNumber()
      });
  }

  setMinTicketLicit(event) {
    this.sellTicket.minimalBidPrice = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidStep = null;
    this.sellTicket.bidCounter = null;
    this.sellTicket.bidEndDate = null;
    this.newMinTicketLicit = [];
    this.newTicketBidStep = [];
    this.newTicketCurrentBid = [];
    this.newTicketBidCounter = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.numberOfTickets == event) {
          this.newMinTicketLicit.push(ticket.minimalBidPrice);
        }
        this.getTicketMinimalBid();
      });
  }

  setTicketBidStep(event) {
    this.sellTicket.bidStep = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidCounter = null;
    this.sellTicket.bidEndDate = null;
    this.newTicketBidStep = [];
    this.newTicketCurrentBid = [];
    this.newTicketBidCounter = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.minimalBidPrice == event) {
          this.newTicketBidStep.push(ticket.bidStep);
        }
        this.getTicketBidStep()
      });
  }

  setTicketBidCounter(event) {
    this.sellTicket.bidCounter = null;
    this.sellTicket.currentBid = null;
    this.sellTicket.bidEndDate = null;
    this.newTicketBidCounter = [];
    this.newTicketCurrentBid = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.bidStep == event) {
          this.newTicketBidCounter.push(ticket.bidCounter);
        }
        this.getTicketBidCounter()
      });
  }

  setTicketCurrentBid(event) {
    this.sellTicket.currentBid = null;
    this.sellTicket.bidEndDate = null;
    this.newTicketCurrentBid = [];
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.bidCounter == event) {
          this.newTicketCurrentBid.push(ticket.currentBid);
        }
        this.getTicketCurrentBid()
      });
  }

  setTicketBidEndDate(event) {
    this.sellTicket.bidEndDate = null;
    this.newTicketBidEndDate = [];
    this.chosenTickets.map(
      ticket => {
        if (ticket.currentBid == event) {
          this.newTicketBidEndDate.push(ticket.bidEndDate);
        }
        this.getTicketBidEndDate();
      });
  }


  getTicketEventName() {
    return this.newTicketEventName.filter((eventName, index) => {
        return this.newTicketEventName.indexOf(eventName) === index;
      }
    )
  }

  getTicketSellerName() {
    return this.newTicketSeller.filter((seller, index) => {
      return this.newTicketSeller.indexOf(seller) === index
    });
  }

  getTicketNumber() {
    return this.newNumberOfTickets
      .filter((newNumber, index) => {
        return this.newNumberOfTickets.indexOf(newNumber) === index
      });
  }

  getTicketMinimalBid() {
    return this.newMinTicketLicit
      .filter((minBid, index) => {
        return this.newMinTicketLicit.indexOf(minBid) === index
      });
  }

  getTicketBidStep() {
    return this.newTicketBidStep
      .filter((bidStep, index) => {
        return this.newTicketBidStep.indexOf(bidStep) === index
      });
  }

  getTicketBidCounter() {
    return this.newTicketBidCounter
      .filter((bidCounter, index) => {
        return this.newTicketBidCounter.indexOf(bidCounter) === index
      });
  }

  getTicketCurrentBid() {
    return this.newTicketCurrentBid
      .filter((currentBid, index) => {
        return this.newTicketCurrentBid.indexOf(currentBid) === index
      });
  }

  getTicketBidEndDate() {
    return this.newTicketBidEndDate
      .filter((bidEndDate, index) => {
        return this.newTicketBidEndDate.indexOf(bidEndDate) === index
      });
  };

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hiba',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const {role} = await alert.onDidDismiss()
  }

  closeLicit() {
    this.sellTicket = new TicketModel();
    localStorage.removeItem('ticketId');
    this.navCtr.navigateRoot('tabs/ticket').then(value => value);
  }

  licitManager() {
    if (this.licitCounter == 0 || this.licitCounter == undefined) {
      this.presentAlert('Az osszeg nagyobb kell legyen mint 0').then(value => value);
    } else if (this.licitCounter <= this.sellTicket.bidStep) {
      this.presentAlert(`Az osszeg nagyobb kell legyen mint ${this.sellTicket.bidStep}`).then(value => value);
    } else {

      Observable.fromPromise(this.afDb.object<TicketModel>(`tickets/${localStorage.ticketId}`)
        .update({
          bidCounter: this.sellTicket.bidCounter + 1,
          currentBid: this.sellTicket.currentBid + this.licitCounter
        })).subscribe(ticket => this.licitCounter = null);
    }
  }

  deleteTicketData() {
    this.ticketEvent = '';
    this.seller = '';
    this.oneTicket = false;
    this.newTicketEventName = [];
    this.newTicketSeller = [];
    this.sellTicket = new TicketModel();
    localStorage.removeItem('ticketId');
    this.oneTicket = false;
    this.ticketService.getAllTicket().subscribe(
      tickets => {
        this.allTickets = tickets;
        this.allTickets.map(
          (newTicket, index) => {
            newTicket.seller = tickets[index].seller;
            newTicket.event = tickets[index].event;
            this.newTicketEventName.push(newTicket.event.name);
          }
        );
      }
    );
  }

  licitInit() {
    this.afDb.object<TicketModel>(`tickets/${localStorage.getItem('ticketId')}`).valueChanges().subscribe(
      ticket => {
        this.oneTicket = true;
        this.sellTicket = ticket;
        this.seller = ticket.seller.name;
        this.ticketEvent = ticket.event.name;
      }
    )
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back());
    localStorage.removeItem('ticketId');
  }

  getTicketId(event) {
    this.chosenTickets.map(
      ticket => {
        if (ticket.seller.name == this.seller &&
          ticket.numberOfTickets == this.sellTicket.numberOfTickets &&
          ticket.minimalBidPrice == this.sellTicket.minimalBidPrice &&
          ticket.bidStep == this.sellTicket.bidStep &&
          ticket.bidCounter == this.sellTicket.bidCounter &&
          ticket.bidEndDate == this.sellTicket.bidEndDate) {
          localStorage.setItem('ticketId', ticket.id);
          this.oneTicket = true;
          this.scrolling = true;
        }
      }
    );
  }

  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottomContent() {
    this.getContent().scrollToBottom(300);
  }
}
