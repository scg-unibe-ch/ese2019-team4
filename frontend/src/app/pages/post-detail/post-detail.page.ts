import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {PostService} from '../../services/post/post.service';
import {SessionService} from '../../services/session.service';
import {DatabaseService} from '../../services/database/database.service';

/**
 * The post detail page is accessed once you click on a post card. It contains the
 * title, the description, the providers name, the providers contact information,
 * every user that is subscribed to the post and lastly the chosen images in a neat fashion.
 * It fetches all the posts information from the database, which can be accessed
 * on the page http://localhost:3001/posts/. The information just needs to be displayed in the post.
 */
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  loadedPost;
  database_url = 'http://localhost:3001/posts/';
  database = this.db.connect(this.database_url, this.session);
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
    private session: SessionService,
    private db: DatabaseService) { }

  // A method to save the customer in the subscribed to list.
  subscribe() {
      var func = function(success) {
        this.ngOnInit();
        this.session.updatePosts();
      }.bind(this)
      this.database.post({customer: this.session.username, post: this.postId}, func, 'subscribe');
  }

  // A method to remove a customer from the subscribed to list
  unsubscribe() {
    var func = function(success) {
      this.ngOnInit();
      this.session.updatePosts();
    }.bind(this);
    this.database.post({customer: this.session.username, post: this.postId}, func, 'unsubscribe');
  }

  // A Method to delete a post, depending on whether you made it
  delete() {
    var func = function(success) {
      this.router.navigate(['/profile']);
      this.session.updatePosts();
    }.bind(this);
    this.database.post({customer: this.session.username, id: this.postId}, func, 'delete');
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
        this.canSubscribe = (!this.subscribed && this.session.isLoggedIn() && !this.session.isProvider());
        this.isOwner = (this.session.username == data["author"]);
      });
      }
    );
  }

}
