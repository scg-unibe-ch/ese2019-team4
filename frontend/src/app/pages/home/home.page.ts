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
  search: "";

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
  // A terrible search method that only searches users
  searchPosts(post) {
    var re = new RegExp(this.search+"+")
    console.log(this.search)
    return (re.test(post.body) || re.test(post.title) || re.test(post.author) || (this.search === null) || (this.search == ""));
    // call search posts in post.service.ts
  }
}
