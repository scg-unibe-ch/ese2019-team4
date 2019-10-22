import { Component, OnInit, Input } from '@angular/core';
import {DatabaseService} from '../database/database.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input()
  set url(str: string) {
    this.database = new DatabaseService(this.http, str);
    this.database_url = str;
  }
  database_url: string;
  database = null;
  error = null;
  customer = {};

  register(name: string, password: string, password_verify: string) {
      if (name == null || password == null || name == "" || password == "")
        this.error = "No whitespaces allowed!"
      else if (password != password_verify)
        this.error = "Passwords are not the same!"
      else {
        var func = function(success) {
          if (success)
            this.error = "Register successful"
          else
            this.error = "User already exists"
        }.bind(this)
        this.database.add({"username": name, "password": password}, func);
      }
    }


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
