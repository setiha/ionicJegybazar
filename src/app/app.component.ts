import { Component } from '@angular/core';
import {TabsPage} from "./tabs/tabs.page";
import {LoginPage} from "./login/login.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = LoginPage;
  constructor() {}

}
