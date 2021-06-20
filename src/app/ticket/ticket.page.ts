import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {createAnimation, IonRouterOutlet, NavController, NavParams} from "@ionic/angular";
import {TicketServiceService} from "../shared/ticket-service.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import 'rxjs-compat/add/observable/fromEvent';
import 'rxjs-compat/add/operator/distinctUntilChanged';
import {TicketModel} from "../shared/ticket-model";
import {LicitPage} from "../licit/licit.page";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit, AfterViewInit, OnDestroy {
  private ticketsSubscription: Subscription;
  ticketList;
  searchText: string;
  shouldShowCancel: boolean = true;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private navCtr: NavController,
              public ticketService: TicketServiceService,
              private cdr: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.ticketService.ticketDetails();
    this.ticketService.getAllTicket().flatMap(
      tickets => {
        return this.filteredText$.map(
          filterText => {
            if (filterText === null) {
              return tickets;
            } else {
              return tickets.filter(
                ticket => {
                  return ticket.event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
                }
              );
            }
          }
        );
      }
    ).subscribe(tickets => {
      this.ticketList = tickets;
      this.cdr.detectChanges();
    });

  }

  ngOnDestroy(): void {
    this.ticketsSubscription.unsubscribe();
  }

  ticketListUpdate(event) {
    this.searchText = (event.target as HTMLInputElement).value;
    if (this.searchText.length === null) {
      this.searchText = null;
    } else {
      this.filteredText$.next(this.searchText);
    }
  }

  getPicture(id) {
    return this.ticketService.pictures[id];
  }

  cancelText() {
    this.searchText = null;
    this.filteredText$.next(this.searchText);
  }

  clickOnkBackButton() {
    const animation = createAnimation()
      .addElement(document.querySelector('#first'))
      .duration(500)
      .fromTo("opacity", 1, 0);
    animation.play().then(r => this.navCtr.back()).then(animation.stop);
  }

  openTicketManager() {
    this.navCtr.navigateRoot('tabs/ticket-manager').then(value => value);
  }
  ticketSell(ticket){
    this.navCtr.navigateRoot('tabs/licit').then(value => value);
    this.ticketService.ticketSell(ticket)
  }
}
