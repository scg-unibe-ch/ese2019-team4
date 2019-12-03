import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/database/database.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {Post} from '../../services/post/post.model';
import { SessionService } from '../../services/session.service';
import {IonInput} from '@ionic/angular';


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
              private db:DatabaseService) { }


  logout() {
    this.session.logout();
  }
  dataCheck(title: string, body: string, image: number) {
    function whiteSpaceCheck(anything: string) {
      if (anything == null || anything === '' ) {
        return true;
      } else { return false; }
    }
    if (whiteSpaceCheck(title)) {
      this.error = 'Don\'t leave the Title empty';
      return false;
    }
    if (whiteSpaceCheck(body)) {
      this.error = 'Don\'t leave the content empty';
      return false;
    }
    if (image != 1 && image != 0){
      this.error = 'Only images are 0 and 1';
      return false;
    }
    return true;
  }


  submitPost(title: string, body: string, image: number) {
    if ( this.dataCheck(title, body, image) ) {
      var con = this.db.connect("http://localhost:3001/posts/", this.session);
      var func = function (success) {
        if (success) {
        this.session.updatePosts();
        this.error = "post successful";
        } else {this.error = 'Your session has expired, please log out.';}
      }.bind(this)
      con.post({"title": title, "body": body, "image": image}, func);
    }
  }

  ngOnInit() {
    this.session.updatePosts();
  }

  setNextFocus(content) {
    content.setFocus();
  }
}
