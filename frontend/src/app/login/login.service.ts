import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from '../database/database.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private database: DatabaseService) {}

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
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem('type');
        localStorage.removeItem('username');
        //localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}
