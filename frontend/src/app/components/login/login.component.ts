import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database/database.service';
import { SessionService } from '../../services/session.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error = null;
  customer = {};
  database_url = 'http://localhost:3001/customer/login';
  database = this.db.connect(this.database_url);
  inputType: string = 'password';
  iconType: string = 'eye';

  /* checks if username and password match
  *
  */
  login(name: string, password: string,) {
      var func = function(success) {
        if (success == false) {
          this.error = "Invalid username or password";
        }
        else {
          this.session.login(name, password);
          this.router.navigate(['/profile']);
        }
      }.bind(this)
      this.database.post({"username": name, "password": password}, func)
  }

  constructor(private http: HttpClient,
              private router: Router, private session:SessionService, private db:DatabaseService) { }

  ngOnInit() {
  }

  nextSetPassword(Password) {
    Password.setFocus();
  }

  // makes the password visible and changes the icon
  changeInputType() {
    if ( this.inputType === 'password') {
      this.inputType = '';
      this.iconType = 'eye-off';
    } else {
      this.inputType = 'password';
      this.iconType = 'eye';
    }
  }
}
