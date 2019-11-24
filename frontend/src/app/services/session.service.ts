import { Injectable } from '@angular/core';

/**
* Provides the session information
* It is muted by the authentication service
*/
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
          "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
  username = this.info.username;
  type = this.info.type;
  token = this.info.token;
  expires_at = this.info.expires_at;

  update() {
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
    return (localStorage.getItem("username") === null);
  }

  public isProvider() {
    return (localStorage.getItem("type") == "provider");
  }

  constructor() { }
}
