import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database/database.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name: string;
  password: string;
  repeatPassword: string;
  error = null;
  databaseUrl = 'http://localhost:3001/account/';
  database = new DatabaseService(this.http, this.databaseUrl);

  register(name: string, password: string, repeatPassword: string) {
    if (name == null || password == null) {
      this.error = 'No whitespaces allowed!';
    }
    else if (password != repeatPassword) {
      this.error = 'Passwords are not the same!';
 }
    else {
      this.database.add({username: name, password: password});
      this.error = null;
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {}

}
