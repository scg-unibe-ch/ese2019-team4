import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {SessionService} from '../../services/session.service';

/**
 * The profile page that each user can access after he logged in. It contains some
 * information about the account and also all the posts the user is either subscribed to
 * or the posts the user has made. You can also log out from the account on this page.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  error = null;
  customer = {};
  database_url = 'http://localhost:3001/customer/';
  database = this.db.connect(this.database_url);
  post = {};


  constructor(private http: HttpClient,
              private router: Router,
              private postService: PostService,
              private session: SessionService,
              private db: DatabaseService) { }

  // a method to log out from the account. destroys the session token.
  logout() {
    this.session.logout();
  }

  // updates to see if any new posts have been added
  ngOnInit() {
    this.session.updatePosts();
  }
}
