import { Component, OnInit, Input } from '@angular/core';
import {DatabaseService} from '../database/database.service';
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
  set url(str: string) {
    this.database = new DatabaseService(this.http, str);
    this.database_url = str;
  }
  database_url: string;
  database = null;
  error = null;
  customer = {};
//created a subfunction for input validation, added redirect
  register(name: string, password: string, password_verify: string) {
    if (this.dataCheck(name, password, password_verify)) {
      var func = function(success) {
        if (success) {
          this.error = "Registration successful!";
          this.alertController.create({header:'Registration successful!',
            buttons: [
              {text: 'Okay',
                handler: () => {
                  this.router.navigate(['/profile']);
                }}
            ]}
          ).then(alertEl => {
            alertEl.present();
          });
        }
        else
          this.error = "User already exists"
      }.bind(this)
      this.database.add({"username": name, "password": password}, func);
    }

  }


  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
  }

  nextField(Field) {
    Field.setFocus();
  }
  dataCheck(name: string, password: string, password_verify: string) {
    if (name == null || password == null || name == "" || password == "") {
      this.error = "No whitespaces allowed!"
      return false;
    }
    else if (password !== password_verify) {
      this.error = "Passwords are not the same!"
      return false;
    }
    return true;
  }
}
