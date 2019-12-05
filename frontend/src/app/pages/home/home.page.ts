import {Component, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  bool = true;
  myInput: any;
  search = null;

  constructor(private http: HttpClient, public session: SessionService) {
  }

  ngOnInit() {
    this.session.updatePosts();
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
  //checks if a post matches the current search
  searchPosts(post) {
    var re = new RegExp(this.search+"+")
    return (re.test(post.body) || re.test(post.title) || re.test(post.author) || (this.search === null) || (this.search == ""));
  }
}
