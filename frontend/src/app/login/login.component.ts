import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DatabaseService} from '../database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  error = null;
  databaseUrl = 'http://localhost:4200/account/';
  database = new DatabaseService(this.http, this.databaseUrl);

  login(name: string, password: string,) {
    if (!this.database.userExists(name))
      this.error = 'User doesn\'t exist';
    if (!this.database.passwordMatches(password))
      this.error = 'Password is not correct';
    else {
      this.error = 'Login successful';
    }
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

}
