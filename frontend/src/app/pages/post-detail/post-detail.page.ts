import { Component, OnInit } from '@angular/core';
import {Post} from '../../services/post/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  loadedPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('postId')) {
          // redirect
          return;
        }
        const postId = +paramMap.get('postId');
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
