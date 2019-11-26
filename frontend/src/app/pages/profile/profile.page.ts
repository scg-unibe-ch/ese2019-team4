import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {Post} from '../../services/post/post.model';
import { SessionService } from '../../services/session.service';
import {IonInput} from '@ionic/angular';


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
  post = {};
  posts;


  constructor(private http: HttpClient,
              private router: Router,
              private postService: PostService,
              private session: SessionService) { }


  logout() {
    this.session.logout();
  }
  dataCheck(title: string, body: string) {
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


  submitPost(title: string, body: string) {
    if ( this.dataCheck(title, body) ) {
      var db = new DatabaseService(this.http, "http://localhost:3001/posts/");
      var func = function (success) {
        console.log(success);
      }
      db.add({"title": title, "body": body, "author": this.session.username}, func);
      this.error = 'Post successful';
    }
  }

  ngOnInit() {
    this.postService.getUserPosts(this.session.username).subscribe(data => {
      this.posts = data['instances'];
    });
  }

  setNextFocus(content) {
    content.setFocus();
  }
}
