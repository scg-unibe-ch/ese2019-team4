import { Injectable } from '@angular/core';
import { DatabaseService } from './database/database.service'
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';



/**
* Provides the session information
* It is muted by the authentication service
*/
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  backend_url = 'http://localhost:3001/'; // has to be configured here! (the url to the backend server)

  database = new DatabaseService(this.http, this.backend_url+"customer/");
  info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
          "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
  username = this.info.username;
  type = this.info.type;
  token = this.info.token;
  expires_at = this.info.expires_at;

  // communicates with the backend and logs a user in
  login(name: string, password: string) {
    var func = function(res) {
      if (res == false) {
        console.log("Error: invalid in authentication")
      }
      else {
        this.setSession(res)
      }
    }.bind(this)
    this.database.post("login", {"username": name, "password": password}, func)
  }

  private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('type', authResult.type);
      localStorage.setItem('username', authResult.username);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
      this.update()
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem('type');
      localStorage.removeItem('username');
      localStorage.removeItem("expires_at");
      this.update()
  }


  update() {
    // logs out if the expiration time is exceeded
    /*if (!moment().isBefore(this.getExpiration())){
      this.logout();
    }*/
    // is updated by the login service on login or logout
    this.info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
            "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
    this.username = this.info.username;
    this.type = this.info.type;
    this.token = this.info.token;
    this.expires_at = this.info.expires_at;
  }

  public isLoggedIn() {
    // checks if someone is logged in, if a value cannot be found in the local storage, it is set to null
    this.update()
    return (localStorage.getItem("username") === null);
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }

  public isProvider() {
    return (localStorage.getItem("type") == "provider");
  }

  constructor(private http: HttpClient) { }
}
