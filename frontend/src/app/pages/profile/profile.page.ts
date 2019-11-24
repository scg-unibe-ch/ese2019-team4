import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { DatabaseService } from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {Post} from '../../services/post/post.model';
import { SessionService } from '../../services/session.service';


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

  authentication = new LoginService(this.http, this.database, this.session);
  posts;


  constructor(private http: HttpClient,
              private router: Router,
              private postService: PostService,
              private session:SessionService) { }


  logout() {
    this.authentication.logout();
  }



  submitPost(title: string, body: string) {
    var db = new DatabaseService(this.http, "http://localhost:3001/posts/");
    var func = function(success) {
      console.log(success);
    }
    db.add({"title": title, "body": body, "author": this.session.username}, func);
  }

  ngOnInit() {
    this.postService.getUserPosts(this.session.username).subscribe(data => {
      this.posts = data['instances'];
    });
    //this.offerButtonVisibility();
  }
}
