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
  @Input()
  isProvider = false;
  URL = 'http://localhost:3001/costumer';
  DATABASE_URL: string;
  database = null;
  error = null;
  customer = {};
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
        else
          this.error = 'User already exists';
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
    console.log(this.URL);
  }


  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  nextField(Field) {
    Field.setFocus();
  }
  dataCheck(name: string, password: string, PASSWORD_VERIFY: string) {
    if (name == null || password == null || name === '' || password === '') {
      this.error = 'No whitespaces allowed!';
      return false;
    } else if (password !== PASSWORD_VERIFY) {
      this.error = 'Passwords are not the same!';
      return false;
    }
    return true;
  }

  nextSetFocus(password) {
    password.setFocus();
  }
}
