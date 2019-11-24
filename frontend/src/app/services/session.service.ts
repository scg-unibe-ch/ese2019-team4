import { Injectable } from '@angular/core';

/**
* Provides the session information
*/
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
          "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}

  update() {
    // is updated by the login service on login or logout
    this.info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
            "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
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
