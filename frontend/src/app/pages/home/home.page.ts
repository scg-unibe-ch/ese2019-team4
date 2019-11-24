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

  constructor(private postService: PostService, private http: HttpClient, public session:SessionService) {
  }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data['instances'];
    });
    }
}
