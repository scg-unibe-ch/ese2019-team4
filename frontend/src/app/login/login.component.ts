import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { DatabaseService } from '../services/database/database.service';
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
  authentication = new LoginService(this.http, this.database)

  /* checks if username and password match
  *
  */
  login(name: string, password: string,) {
      var func = function(success) {
        if (success == false) {
          this.error = "Invalid username or password";
        }
        else {
          this.authentication.login(name, password);
          this.router.navigate(['/home']);
        }
      }.bind(this)
      this.database.post("login", {"username": name, "password": password}, func)
  }
  logout() {
    this.authentication.logout();
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  nextSetPassword(Password) {
    Password.setFocus();
  }
}
