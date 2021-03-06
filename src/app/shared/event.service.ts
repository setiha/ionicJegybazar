import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable, ReplaySubject, Subject} from "rxjs";
import {EventModel} from "./event-model";
import {fromPromise} from "rxjs-compat/observable/fromPromise";
import "rxjs-compat/add/observable/combineLatest";
import "rxjs-compat/add/operator/switchMap";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public event = new ReplaySubject<EventModel>();
  public isNewEvent = new ReplaySubject<Boolean>();


  constructor(public afDb: AngularFireDatabase) {

  }
  getEventById(id: any) {
    return this.afDb.object<EventModel>(`events/${id}`).valueChanges();
  }

  getAllEvent() {
    return this.afDb.list("events");
  }

  save(param: EventModel) {
    if (param.id) {
      // update
      return this.afDb.object(`events/${param.id}`).update(param);
    } else {
      param.id = '';
      return Observable.fromPromise(this.afDb.list(`events`).push(param))
        .map(resp => resp.key)
        .do(key => Observable.fromPromise(
          this.afDb.object(`events/${key}`)
            .update({id: key}))).subscribe(ev => ev);

    }

  }

  delete(event: EventModel) {
    return Observable.fromPromise(this.afDb.object(`events/${event.id}`).remove());

  }

}
