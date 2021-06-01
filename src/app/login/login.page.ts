import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {loginDataModel} from "../shared/loginDataModel";
import {Router} from "@angular/router";
import {NavController, NavParams} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/auth";
import {TabsPage} from "../tabs/tabs.page";
import {HomePage} from "../home/home.page";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: loginDataModel = {
    email: "",
    password: "",
  }

  constructor(public userService: UserService,
              public router: Router,
              public navCtrl: NavController){
  }

  ngOnInit() {
    if(this.userService.isLogin){
      this.navCtrl.navigateRoot('tabs/home').then(value => value);
    }

    this.userService.loginSubject.subscribe(
      user => {
        this.navCtrl.navigateRoot('tabs/home').then(
          value => value
        )
      }
    )
  }

  login() {
    this.userService.login(this.loginData.email, this.loginData.password)
  }
}
