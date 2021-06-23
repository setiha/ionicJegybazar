import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {EventService} from "./event.service";
import {BehaviorSubject, Observable, ReplaySubject, Subject} from "rxjs";
import {TicketModel} from "./ticket-model";
import 'rxjs/add/observable/zip';
import "rxjs-compat/add/observable/forkJoin";
import {EventModel} from "./event-model";
import {UserService} from "./user.service";
import "rxjs-compat/add/observable/combineLatest";
import {UserModel} from "./user-model";

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {
  pictures = {};
  ticketEvent = {};
  sellTicket:ReplaySubject<TicketModel> = new ReplaySubject<TicketModel>();

  constructor(public afDb: AngularFireDatabase,
              public eventService: EventService,
              public userService: UserService) {

  }

  getAllTicket() {
    return this.afDb.list<TicketModel>('tickets').valueChanges().map(
      ticketsArray => ticketsArray.map(
        ticket => Observable.zip(
          Observable.of(ticket),
          this.eventService.getEventById(ticket.eventId),
          this.userService.getUserById(ticket.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          }
        )
      )
    ).switchMap(zipStreamArray => Observable.forkJoin(zipStreamArray))
  }

  ticketDetails() {
    this.eventService.getAllEvent().valueChanges().subscribe(
      (events: any) => events.map(
        (event: any) => {
          this.pictures[event.id] = event.pictureURL;
          this.ticketEvent[event.id] = event.name;
        }
      )
    );
  }

  getAllTicketForDelete(ev) {
    this.afDb.list<TicketModel>('tickets').valueChanges().map(
      tickets => tickets.map(
        ticket => ticket
      )
    ).subscribe(value => value.map(
      val => {
        if (val.eventId == ev.id) {
          return Observable.fromPromise(this.afDb.object(`tickets/${val.id}`).remove());
        }
      }
    ));
  }
  create(ticket: TicketModel) {
    ticket.id ='';
    return Observable.fromPromise(this.afDb.list<TicketModel>('tickets').push(ticket))
      .map(resp => resp.key)
      .do(key => Observable.fromPromise(
        this.afDb.object(`tickets/${key}`).update({id: key}))).subscribe(value => value)

  }
  ticketSell(ticket:TicketModel) {
    this.sellTicket.next(ticket)
  }
}
