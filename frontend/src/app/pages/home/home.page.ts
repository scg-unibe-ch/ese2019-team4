import { Component, OnInit } from '@angular/core';
import {Post} from '../../../post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
    if (this.username != null) {
      document.getElementById("log").style.display = "none";
      document.getElementById("acc").style.display = "block";
    } else {
      document.getElementById("log").style.display = "block";
      document.getElementById("acc").style.display = "none";
    }
  }
}
