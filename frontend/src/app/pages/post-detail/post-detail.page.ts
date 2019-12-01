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

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private alertCtrl: AlertController,
    private session: SessionService) { }

    subscribe() {
        var func = function(success) {
          if (success == false) {
            console.log("sub failed")
          }
          else {
            console.log("subbed")
          }
        }.bind(this)
        console.log("sending: "+this.session.username+this.postId)
        this.database.post("subscribe", {"customer": this.session.username, "post": this.postId}, func)
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
        console.log(this.loadedPost);
      });
      }
    );
  }
  /*onDeletePost() {
    this.alertCtrl.create({header:'Are you sure?', message: 'Do you really want to delete this recipe?',
      buttons:[
        {text: 'Cancel', role: 'cancel'},
        {text: 'Delete',
          handler: () => {
            this.recipesService.deleteRecipe(this.loadedRecipe.id);
            this.router.navigate(['/recipes']);
          }}
      ]}
    ).then(alertEl => {
      alertEl.present();
    });
  }*/

}
