import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    connect(url: string, authentication: SessionService = null){
      return new Connection(this.http, url, authentication);
    }

  constructor(private http: HttpClient) { }
}

class Connection {
  constructor(private http: HttpClient, private url: string, private authentication: SessionService = null) { }

  /* posts an object to the connected url
  * @param func: the function is executed with the connections return as parameter
  * If the connection object has an authentication, it will be appended to the message
  */
  post(tuple: object, func = function(success){return;}, path = ""): void {
    if (this.authentication === null) {
      this.http.post(this.url+path, tuple).subscribe(data => func(data));
    } else {
      tuple["username"] = this.authentication.username;
      tuple["token"] = this.authentication.token;
      // combines authentication reaction and provided function
      var composite_function = function(success){
        this.authentication.authenticate(success); // see in session service
        func(success);}.bind(this)
      this.http.post(this.url+path, tuple).subscribe(data => composite_function(data));
    }
  }
}
