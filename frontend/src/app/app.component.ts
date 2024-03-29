import {Component, OnInit} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SessionService} from './services/session.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';

/**
 * The app component is the main component of the website, yet it only contains
 * an ion-app opening and closing tag + the menu.
 */
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
    private httpClient: HttpClient,
    private session: SessionService,
  ) {
    this.sideMenu();
    this.initializeApp();
  }
  navigate: any;
  Dark: boolean;

  url = 'http://localhost:4200/account/';
  username = localStorage.getItem('username');

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * array of pages for sidemenu, would like to move it to the sidemenu component
   */
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

  ngOnInit() {
    this.isDark();
  }

  /**
   *  toggles the dark tag on the body
   */
  toggleDark() {
    this.session.toggleDark();
  }
  isDark() {
    if ( localStorage.getItem('theme') === null ) {
      this.Dark = false;
    } else { this.Dark = true; }
  }
  toggleMenu() {
      this.menuCtrl.toggle();
  }
}
