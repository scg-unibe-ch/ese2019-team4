import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Post} from '../../services/post/post.model';
import { PostService} from '../../services/post/post.service';
import {HttpClient} from '@angular/common/http';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  posts = [];
  username = this.session.info.username;
  type = this.session.info.type;
  info = this.session.info;
  status: String;

  constructor(private postService: PostService, private http: HttpClient, public session:SessionService) {
  }
  loggedInStatus() {
    if (this.username === null) {
      this.status = 'Logged out';
    }
    else {
      this.status = 'Logged in as ' + this.username + ' a ' + this.type;
    }
  }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data['instances'];
    });
    this.loggedInStatus();
    }

  updateUser() {
    this.username = this.session.info.username;
    this.type = this.session.info.type;
    this.loggedInStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUser();
  }
}
