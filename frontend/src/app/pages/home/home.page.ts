import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Post} from '../../services/post/post.model';
import { PostService} from '../../services/post/post.service';
import {HttpClient} from '@angular/common/http';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts = [];
  bool: boolean = true;
  myInput: any;

  constructor(private postService: PostService, private http: HttpClient, public session: SessionService) {
  }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data['instances'];
    });
    }
  // Makes the search bar visible or invisible
  searchVisibility(input) {
    if ( this.bool === true ) {
      this.bool = false;
      input.setFocus();
    } else {
      this.bool = true;
    }
  }
  // A terrible search method that only searches users
  searchPosts() {
    if ( this.myInput === '') {
      this.postService.getPosts().subscribe(data => {
        this.posts = data['instances'];
      });
    } else {
      this.posts = null;
      this.postService.getUserPosts(this.myInput).subscribe(data => {
        this.posts = data['instances'];
      });
    }
  }
}
