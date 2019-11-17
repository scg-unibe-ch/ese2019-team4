import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  username = localStorage.getItem("username");
  type = localStorage.getItem("type");
  token = localStorage.getItem("id_token");
  expires_at = localStorage.getItem("expires_at");
  info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
          "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}

  update() {
    console.log("updated")
    this.username = localStorage.getItem("username");
    this.type = localStorage.getItem("type");
    this.token = localStorage.getItem("id_token");
    this.expires_at = localStorage.getItem("expires_at");
    this.info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
            "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
  }

  public isLoggedIn() {
    return (localStorage.getItem("username") === null);
  }

  constructor() { }
}
