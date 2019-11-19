import { Component, OnInit, Input } from '@angular/core';
import {DatabaseService} from '../../services/database/database.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController) { }
  @Input()
  isProvider = false;
  URL = 'http://localhost:3001/costumer';
  DATABASE_URL: string;
  database = null;
  error = null;
  customer = {};
  entryField: String = 'password';
  // created a subfunction for input validation, added redirect
  register(name: string, password: string, PASSWORD_VERIFY: string) {
    if (this.dataCheck(name, password, PASSWORD_VERIFY)) {
      var func = function(success) {
        if (success) {
          this.error = 'Registration successful!';
          this.alertController.create({header: 'Registration successful!',
            buttons: [
              {text: 'Okay',
                handler: () => {
                  this.router.navigate(['./login-user']);
                }}
            ]}
          ).then(alertEl => {
            alertEl.present();
          });
        }
        else {
          document.documentElement.style.setProperty('--name-color', '#f04141' );
          this.error = 'User already exists';
        }
      }.bind(this)
      this.database.add({"username": name, "password": password}, func);
    }

  }
  url() {
    if (this.isProvider) {
      this.URL = 'http://localhost:3001/provider';
    } else {
      this.URL = 'http://localhost:3001/customer';
    }
    this.database = new DatabaseService(this.http, this.URL);
    this.DATABASE_URL = this.URL;
  }

  ngOnInit() {
  }
  dataCheck(name: string, password: string, PASSWORD_VERIFY: string) {
    const elem = document.documentElement.style;
    const colorMedium = '#989aa2';
    const colorDanger = '#f04141';
    const colorSuccess = '#2fdf75';
    let bool = true;
    function whiteSpaceCheck(anything: string) {
      if (anything == null || anything === '' ) {
        return true;
      } else { return false; }
    }
    // Resets input field colors
    elem.setProperty('--name-color', colorMedium );
    elem.setProperty('--password-color', colorMedium );
    elem.setProperty('--confirmPassword-color', colorMedium );
    // Changes color of input fields depending on correct/false input
    if (whiteSpaceCheck(name)) {
      elem.setProperty('--name-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--name-color', colorSuccess ); }
    if (whiteSpaceCheck(password)) {
      elem.setProperty('--password-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--password-color', colorSuccess ); }
    if (whiteSpaceCheck(PASSWORD_VERIFY)) {
      elem.setProperty('--confirmPassword-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--confirmPassword-color', colorSuccess ); }
    if (password !== PASSWORD_VERIFY) {
      elem.setProperty('--confirmPassword-color', colorDanger );
      this.error = 'Passwords are not the same!';
      bool = false;
    } else if ( bool !== false ) {
      elem.setProperty('--confirmPassword-color', colorSuccess );
    }
    return bool;
  }

  nextSetFocus(password) {
    password.setFocus();
  }

  entryFieldChange() {
    if (this.entryField === 'password') {
      this.entryField = '';
    } else { this.entryField = 'password'; }
  }
}
