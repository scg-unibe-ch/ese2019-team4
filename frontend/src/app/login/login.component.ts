import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';
import { DatabaseComponent } from '../database/database.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error = null;
  customer = {};
  database_url = "http://localhost:3001/customer/";
  database = new DatabaseService(this.http, this.database_url);

  /* checks if username and password match
  *
  */
  login(name: string, password: string,) {
    var func = function(success) {
      if (success) {
        this.error = "Login successful"
        this.router.navigate(['/home']);
      }
      else
        this.error = "Invalid username or password"
    }.bind(this)
    this.database.post("login", {"username": name, "password": password}, func)
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  nextSetPassword(Password) {
    Password.setFocus();
  }
}
