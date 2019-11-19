import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MenuController} from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    public menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient
  ) {
    this.sideMenu();
    this.initializeApp();
  }
  navigate: any;

  /* Trying to route some stuff in the frontend - dominik
  @NgModule({
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
        ])
    ,
  })
   */


  url = 'http://localhost:4200/account/';
  username = localStorage.getItem('username');

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  // array of pages for sidemenu, would like to move it to the sidemenu component
  sideMenu() {
    this.navigate =
      [
        {
          title : 'Home',
          url   : 'home',
          icon  : 'home'
        },
        {
          title : 'Login',
          url   : 'login-user',
          icon  : 'log-in'
        },
        {
          title : 'Register',
          url   : 'register',
          icon  : 'person-add'
        },
      ];
  }
  // makes profile link visible or not depending on whether logged in
  private updateLinkVisibility() {
    if (this.username != null) {
      document.getElementById('ProfileLink').style.display = 'block';
    } else {
      document.getElementById('ProfileLink').style.display = 'none';
    }
  }
  ngOnInit() {
    this.updateLinkVisibility();
  }
  // toggles the dark tag on the body
  toggleDark() {
    document.body.classList.toggle('dark');
  }
  toggleMenu() {
      this.menuCtrl.toggle();
  }
}
