import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {loginDataModel} from "../shared/loginDataModel";
import {Router} from "@angular/router";


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
              public router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginData.email, this.loginData.password).subscribe(
      user => this.router.navigate(['/tabs/home']
      ));
  }
}
