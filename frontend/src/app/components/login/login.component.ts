import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../services/database/database.service';
import {SessionService} from '../../services/session.service';

import {Router} from '@angular/router';

/**
 * The login component, which checks for the account data in the database and then
 * looks if the input data is valid. If the login is correct a session token
 * gets made and the user gets logged in.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error = null;
  customer = {};
  database_url = 'http://localhost:3001/customer/login';
  database = this.db.connect(this.database_url);
  inputType = 'password';
  iconType = 'eye';

  /**
   * checks if username and password match
   * @param name, username input
   * @param password, password input
   */
  login(name: string, password: string, ) {
      let func = function(success) {
        if (success == false) {
          this.error = 'Invalid username or password';
        } else {
          this.session.login(name, password);
          this.router.navigate(['/profile']);
        }
      }.bind(this);
      this.database.post({username: name, password}, func);
  }

  constructor(private http: HttpClient,
              private router: Router, private session: SessionService, private db: DatabaseService) { }

  ngOnInit() {
  }

  // set focus to the next field
  nextSetPassword(Password) {
    Password.setFocus();
  }

  /**
   * makes the password visible and changes the icon once clicked on
   */
  changeInputType() {
    if ( this.inputType === 'password') {
      this.inputType = '';
      this.iconType = 'eye-off';
    } else {
      this.inputType = 'password';
      this.iconType = 'eye';
    }
  }
}
