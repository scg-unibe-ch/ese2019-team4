import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-postservice',
  templateUrl: './postservice.page.html',
  styleUrls: ['./postservice.page.scss'],
})
export class PostservicePage implements OnInit {
  error = null;
  customer = {};
  database_url = 'http://localhost:3001/customer/';
  database = this.db.connect(this.database_url);
  post = {
    image: undefined,
    title: undefined,
    content: undefined,
    username: this.session.username
  };
  previousImg = 0;
  pictures: any[] = [
    {
      id: 1,
      img: 'assets/images/1.jpg'
    },
    {
      id: 2,
      img: 'assets/images/2.jpg'
    },
    {
      id: 3,
      img: 'assets/images/3.jpg'
    },
    {
      id: 4,
      img: 'assets/images/4.jpg'
    }
  ];


  constructor(private http: HttpClient,
              private router: Router,
              private postService: PostService,
              private session: SessionService,
              private db: DatabaseService) { }

  dataCheck(title: string, body: string, image: number) {
    function whiteSpaceCheck(anything: string) {
      if (anything == null || anything === '' ) {
        return true;
      } else { return false; }
    }
    if (whiteSpaceCheck(title)) {
      this.error = 'Don\'t leave the Title empty';
      return false;
    }
    if (whiteSpaceCheck(body)) {
      this.error = 'Don\'t leave the content empty';
      return false;
    }
    return true;
  }


  submitPost(title: string, body: string, username: string, image: number) {
    if ( this.dataCheck(title, body, image) ) {
      const con = this.db.connect('http://localhost:3001/posts/', this.session);
      const func = function(success) {
        if (success) {
          this.session.updatePosts();
          this.error = 'post successful';
        } else {this.error = 'Your session has expired, please log out.'; }
      }.bind(this);
      con.post({title, body, username, image}, func);
    }
  }

  ngOnInit() {
    this.post.image = 0;
  }

  setImage(int) {
    document.getElementById(String(this.previousImg)).style.opacity = '1';
    document.getElementById(int).style.opacity = '0.5';
    this.previousImg = int;
    this.post.image = int;
  }
}
