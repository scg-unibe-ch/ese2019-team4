import {Component, Input, OnInit} from '@angular/core';

/**
 * The post component as seen on the home page.
 * it doesn't have any methods, since all it does is display data
 * and link the user to the actual post
 */
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post = {};
  constructor() { }

  ngOnInit() {}

}
