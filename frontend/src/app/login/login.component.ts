import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../database/database.service';
import { DatabaseComponent } from "../database/database.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  error = null;
  databaseUrl = 'http://localhost:3001/account/';
  database = new DatabaseService(this.http, this.databaseUrl);

  login2() {
    console.log("login");
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

}
