import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {EventModel} from "./event-model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public afDb: AngularFireDatabase) { }

  getAllEvent(){
    return this.afDb.list("events").valueChanges();
  }
}
