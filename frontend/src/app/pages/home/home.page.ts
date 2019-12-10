import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../services/session.service';

/**
 * The home page is our main page that people get routed to by default.
 * It holds all the post cards made by users sorted by most recent,
 * the menu button on the left, a login or account button on the right
 * and there is a There is a search button as well, to search through all the posts.
 */
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

  /**
   * Makes the search bar visible or invisible
   * @param input, search input
   */
  searchVisibility(input) {
    if ( this.bool === true ) {
      this.bool = false;
      input.setFocus();
    } else {
      this.bool = true;
    }
  }

  /**
   * checks wheter a post matches the search
   * @param post, post that should be tested
   */
  searchPosts(post) {
    var re = new RegExp(this.search + '+')
    return (re.test(post.body) || re.test(post.title) || re.test(post.author) || (this.search === null) || (this.search == ''));
  }
}
