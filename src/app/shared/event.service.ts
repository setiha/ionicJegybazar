import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable, ReplaySubject} from "rxjs";
import {EventModel} from "./event-model";
import "rxjs-compat/add/observable/combineLatest";
import "rxjs-compat/add/operator/switchMap";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  allEvents;
  idAndPic: Array<{id: string, picture: string}>;
  public event = new ReplaySubject<EventModel>();
  public isNewEvent = new ReplaySubject<Boolean>();
  constructor(public afDb: AngularFireDatabase) {
  }

  getAllEvent() {
    this.allEvents = this.afDb.list("events");
    return this.allEvents;

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
}
