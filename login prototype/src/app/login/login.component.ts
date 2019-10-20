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
    var func = function(success) {
      if (success)
        this.error = "Login successful"
      else
        this.error = "Invalid username or password"
    }.bind(this)
    this.database.post("login", {"username": name, "password": password}, func)
  }


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
