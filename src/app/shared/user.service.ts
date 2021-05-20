import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFireDatabase} from '@angular/fire/database'
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import "rxjs-compat/add/observable/of";
import "rxjs-compat/add/operator/map"
import "rxjs-compat/add/operator/switchMap"
import "rxjs-compat/add/operator/do"
import "rxjs-compat/add/operator/mergeMap"
import "rxjs-compat/add/operator/first"
import "rxjs-compat/add/observable/fromPromise"
import * as moment from 'moment';
import {UserModel} from "./user-model";
import {loginDataModel} from "./loginDataModel";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogin: boolean= false;
  currentUser: loginDataModel = new loginDataModel();
  loginSubject: Subject<any> = new Subject();
  constructor(private _router: Router,
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase) {
if(localStorage.loggedInUser){
  this.currentUser = localStorage.loggedInUser;
  this.setLoggedInState()
}
  }
  setLoggedInState(){
    this.isLogin = true;
    this.currentUser = new loginDataModel(this.currentUser);
    this.loginSubject.next(this.currentUser);
  }
  login(email: string, password: string)  {
     this.afAuth.signInWithEmailAndPassword(email, password).then((user) =>{
       localStorage.loggedInUser = user.user;
       this.setLoggedInState();
       }
     ).catch(firebaseError => {
       console.error(firebaseError)
     })
;
  }

  register(param: UserModel, password: string) {
    return Observable.fromPromise(
      this.afAuth.createUserWithEmailAndPassword(param.email, password)
    ).do(
      user => this.save({...param, id: user.user.uid})
    );
  }

  save(param) {
    return this.afDb.object(`users/${param.id}`).set(param).then(
      user => user
    );
  }
  logout() {
    this.afAuth.signOut();
    this._router.navigate(['/home']);
    console.log('kileptunk');
  }

  getUserById(fbid: string) {
    return this.afDb.object(`users/${fbid}`).valueChanges();
  }
  private userOnlineDetect(user) {
    // specialis firebase path, a sajat connection allapotomat lehet vele vizsgalni
    this.afDb.object('.info/connected').valueChanges().switchMap(
      connected => {
        if (connected === true) {
          // ha csatlakozva vagyok akkor vissza kerem a barataim listajat
          return this.afDb.list(`chat_friend_list/${user.uid}`).snapshotChanges().map(snapshot => snapshot);
        }
        return Observable.of([]);
      }
    )
      .subscribe(
        friendsSnapshot => {
          if (friendsSnapshot.length > 0) {
            // Ha vannak barataim akkor ossze allitok egy listat a frissitendo path-okrol
            // (ezzel a modszerrel tobb utvonalat tudunk egyszerre frissiteni)

            // firebase ebben az esetben array like object-et ker, ezert nem tombot hasznalunk
            const updateOnline = {};
            // minden baratunknal a sajat csomopontunkat kigyujtjuk es beallitjuk neki hogy online vagyunk
            friendsSnapshot.forEach(
              snapshot => {
                updateOnline[`chat_friend_list/${snapshot.key}/${user.uid}/online`] = true;
              }
            );
            // root csomopont referencia elekerese
            const rootAfDb = this.afDb.database.ref();
            // mivel a root csomoponttol adtuk meg az updateOnline-t ezert arra hivjuk az updatet
            // !FELHIVAS! nagyon vigyazz ezzel mert ha valami rosszul adsz meg akkor akar az egesz adatbazist torolheted!
            rootAfDb.update(updateOnline);
            // amikor majd megkapjuk a disconnect esemenyt akkor szeretnenk torolni az online flag-et, ezert
            // lemasoljuk az updateOnline-t de null ertekkel ami miatt firebase torolni fogja
            const updateOffline = {};
            friendsSnapshot.forEach(
              snapshot => {
                updateOffline[`chat_friend_list/${snapshot.key}/${user.uid}/online`] = false;
                updateOffline[`chat_friend_list/${snapshot.key}/${user.uid}/lastOnline`] = moment().unix();
              }
            );

            // disconnect eseten update-vel frissitjuk az ertekeket(a null miatt majd torlodni fog)
            rootAfDb.ref.onDisconnect().update(updateOffline);
          }
        }
      );
  }
}
