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
  searchPosts() {
    //please reimplement
    return;
  }
}
