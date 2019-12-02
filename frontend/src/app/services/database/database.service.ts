import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    connect(url: string){
      return new Connection(this.http, url);
    }

  constructor(private http: HttpClient) { }
}

class Connection {
  constructor(private http: HttpClient, private url: string) { }

  /* posts an object to the connected url
  * @param func: the function is executed with the connections return as parameter
  */
  post(tuple: object, func = function(success){console.log(success)}, path = ""): void {
    this.http.post(this.url+path, tuple).subscribe(data => func(data));
  }
}
