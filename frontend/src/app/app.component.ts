import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient
  ) {
    this.initializeApp();
  }

  /* Trying to route some stuff in the frontend - dominik
  @NgModule({
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ])
    ,
  })
   */

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }

}
