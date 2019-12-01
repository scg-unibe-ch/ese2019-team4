import { Component, OnInit } from '@angular/core';
import {Post} from '../../services/post/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {PostService} from '../../services/post/post.service';
import { SessionService } from '../../services/session.service';
import { DatabaseService } from '../../services/database/database.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  loadedPost;
  database_url = 'http://localhost:3001/posts/';
  database = new DatabaseService(this.http, this.database_url);
  postId;
  subscribed: boolean;
  canSubscribe: boolean;
  isOwner: boolean;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private alertCtrl: AlertController,
    private session: SessionService) { }

    subscribe() {
        var func = function(success) {
          this.ngOnInit();
        }.bind(this)
        this.database.post("subscribe", {"customer": this.session.username, "post": this.postId}, func)
    }

    unsubscribe() {
        var func = function(success) {
          this.ngOnInit();
        }.bind(this)
        this.database.post("unsubscribe", {"customer": this.session.username, "post": this.postId}, func);
    }

    delete() {
      var func = function(success) {
        this.router.navigate(['/profile']);
        this.session.updatePosts();
      }.bind(this)
      this.database.post("delete", {"customer": this.session.username, "id": this.postId}, func)
      console.log("deleted");
    }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('postId')) {
          // redirect
          return;
        }
        const postId = +paramMap.get('postId');
        this.postId = postId;
        this.postService.getPost(postId).subscribe(data => {
        this.loadedPost = data;
        this.subscribed = ((data["subscriptions"].indexOf(this.session.username) != -1) && this.session.isLoggedIn());
        this.canSubscribe = (!this.subscribed && this.session.isLoggedIn() && !this.session.isProvider())
        this.isOwner = (this.session.username == data["author"])
      });
      }
    );
  }

}
