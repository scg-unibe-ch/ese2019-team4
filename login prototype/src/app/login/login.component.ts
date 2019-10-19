/**
 * Login field for customers
 */

import { Component, OnInit, Input } from '@angular/core';
import { DatabaseComponent } from "../database/database.component";
import { DatabaseService } from "../database/database.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = null;
  customer = {};
  database_url = "http://localhost:3001/account/";
  database = new DatabaseService(this.http, this.database_url);

  login(name: string, password: string,) {
    if (!this.database.userExists(name))
      this.error = "User doesn't exist";
    if (!this.database.passwordMatches(password))
      this.error = "Password is not correct";
    else {
      this.error = "Login successful";
    }
  }


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
