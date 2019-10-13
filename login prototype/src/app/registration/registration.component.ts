/**
* Registration field for customers
*/

import { Component, OnInit, Input } from '@angular/core';
import { DatabaseComponent } from "../database/database.component";
import { DatabaseService } from "../database/database.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error = null;
  customer = {};
  database_url = "http://localhost:3001/account/";
  database = new DatabaseService(this.http, this.database_url);

  register(name: string, password: string, password_verify: string) {
      if (name == null || password == null)
        this.error = "No whitespaces allowed!"
      else if (password != password_verify)
        this.error = "Passwords are not the same!"
      else {
        this.database.add({"username": name, "password": password});
        this.error = null;
      }
    }


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
