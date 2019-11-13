import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseComponent } from '../database/database.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  error = null;
  customer = {};
  database_url = 'http://localhost:3001/customer/';
  database = new DatabaseService(this.http, this.database_url);
  authentication = new LoginService(this.http, this.database)

  constructor(private http: HttpClient,
              private router: Router) { }

  username = localStorage.getItem("username");
  type = localStorage.getItem("type");

  logout() {
    this.authentication.logout();
  }
  updateUser() {
    this.username = localStorage.getItem("username");
    this.type = localStorage.getItem("type");
    this.offerButtonVisibility();
  }
  offerButtonVisibility() {
    if (this.type === 'provider') {
      document.getElementById("offer").style.display = "block";
    } else {
      document.getElementById("offer").style.display = "none";
    }
  }
  ngOnInit() {
    this.offerButtonVisibility();
  }
}
