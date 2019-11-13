import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Post} from '../../../post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  private posts: Post[] = [
    {
      id: '1',
      src: '',
      title: 'Birthday Clown',
      body: 'Will definitely not frighten your children',
    },
    {
      id: '2',
      src: '',
      title: 'Catering',
      body: 'special discounts for weddings, available in the greater Bern area',
    }
  ];

  username = localStorage.getItem("username");
  type = localStorage.getItem("type");
  status: String;

  constructor() {
  }
  loggedInStatus() {
    if (this.username === null) {
      this.status = 'Logged out';
    }
    else {
      this.status = 'Logged in as ' + this.username + ' a ' + this.type;
    }
  }
  loginButtonVisibility() {
    if (this.username != null) {
      document.getElementById("log").style.display = "none";
      document.getElementById("acc").style.display = "block";
    } else {
      document.getElementById("log").style.display = "block";
      document.getElementById("acc").style.display = "none";
    }
  }
  updateUser() {
    this.username = localStorage.getItem("username");
    this.type = localStorage.getItem("type");
    this.loginButtonVisibility();
    this.loggedInStatus();
  }
  ngOnInit() {
    this.loginButtonVisibility();
    this.loggedInStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUser();
  }
}
