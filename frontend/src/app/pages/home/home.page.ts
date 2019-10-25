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
      title: 'Birthday Clown',
      body: 'Will definitely not frighten your children',
    },
    {
      id: '2',
      title: 'Catering',
      body: 'special discounts for weddings, available in the greater Bern area',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
