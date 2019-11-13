import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Post} from '../../post/post.model';
import { PostService} from '../../post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnChanges {
  posts = [];
  username = localStorage.getItem("username");
  type = localStorage.getItem("type");

  constructor(private postService: PostService) {
  }
  updateUser() {
    this.username = localStorage.getItem("username");
    this.type = localStorage.getItem("type");
    this.loginButtonVisibility();
  }
  loginButtonVisibility() {
    if (this.username != null) {
      document.getElementById("log").style.display = "none";
      document.getElementById("acc").style.display = "block";
    } else {
      document.getElementById("log").style.display = "block";
      document.getElementById("acc").style.display = "none";
    }
  }
  ngOnInit() {
    this.loginButtonVisibility();
    this.postService.getPosts()
      .subscribe(resp => {
        this.posts = resp.body;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateUser();
  }
}
