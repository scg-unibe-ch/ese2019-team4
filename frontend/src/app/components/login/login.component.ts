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
  database_url = 'http://localhost:3001/customer/';
  database = new DatabaseService(this.http, this.database_url);

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
      this.database.post("login", {"username": name, "password": password}, func)
  }

  logout() {
    this.session.logout();
  }

  constructor(private http: HttpClient,
              private router: Router, private session:SessionService) { }

  ngOnInit() {
  }

  nextSetPassword(Password) {
    Password.setFocus();
  }
}
