import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(public afDb: AngularFireDatabase) { }

  getAllTicket() {
    return this.afDb.list('tickets');
  }
}
