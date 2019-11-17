import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { DatabaseService } from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
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
  authentication = new LoginService(this.http, this.database, this.session);
  posts = [];

  constructor(private http: HttpClient,
              private router: Router,
              private postService: PostService,
              private session:SessionService) { }

  info = this.session.info;

  logout() {
    this.authentication.logout();
  }
  updateUser() {
    this.offerButtonVisibility();
  }
  offerButtonVisibility() {
    if (this.info.type == 'provider') {
      document.getElementById("offer").style.display = "block";
    } else {
      document.getElementById("offer").style.display = "none";
    }
  }
  ngOnInit() {
    this.postService.getUserPosts(this.info.username).subscribe(data => {
      this.posts = data['instances'];
    });
    this.offerButtonVisibility();
  }
}
