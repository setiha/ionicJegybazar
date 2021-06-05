import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy, NavController, NavParams} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageModule} from "./login/login.module";
import {LoginPage} from "./login/login.page";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {HomePage} from "./home/home.page";
import {TabsPage} from "./tabs/tabs.page";
import {TicketPage} from "./ticket/ticket.page";
import {SellTicketPage} from "./sell-ticket/sell-ticket.page";
import {HomePageModule} from "./home/home.module";
import {TabsPageModule} from "./tabs/tabs.module";
import {TicketPageModule} from "./ticket/ticket.module";
import {SellTicketPageModule} from "./sell-ticket/sell-ticket.module";
import {AngularFireModule} from "@angular/fire";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EventService} from "./shared/event.service";
import {EventManagerPage} from "./event-manager/event-manager.page";
import {EventManagerPageModule} from "./event-manager/event-manager.module";


export const firebaseConfig = {
  baseUrl: 'https://jegybazar-133bd.firebaseio.com/',
  registrationUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key',
  loginUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key',
  apiKey: 'AIzaSyAuEmr6G2pHf3jU2FWTsuj07PvGERwO0Eo',
  authDomain: 'jegybazar-133bd.firebaseapp.com',
  databaseURL: 'https://jegybazar-133bd.firebaseio.com',
  projectId: 'jegybazar-133bd',
  storageBucket: 'jegybazar-133bd.appspot.com',
  messagingSenderId: '726633883296',
  appId: '1:726633883296:web:df8e7716544d9f6334cbc5',
  measurementId: 'G-VQDZYEXF7V'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginPage,
    HomePage,
    TabsPage,
    TicketPage,
    SellTicketPage,
  EventManagerPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, LoginPageModule, HomePageModule, TabsPageModule, TicketPageModule, SellTicketPageModule, AngularFireDatabaseModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule, EventManagerPageModule],
  providers: [
    {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
  }, NavParams, NavController, HttpClient, EventService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
