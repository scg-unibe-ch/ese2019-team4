import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    /* sends an object to the specified url
    * @return the servers responce
    */
    add(tuple: object, func: any): void {
        this.http.post(this.url, tuple).subscribe(data => func(data));
    }
    // method in database.service
  /*update() {
    // updates the database table from the url
    this.http.get(this.url).subscribe(data => this.table = data);
    console.log('updated table');
  }*/

    /* posts an object to the desired path
    * @return response of the object
    */
    post(location: string, tuple: object, func: any): void {
      this.http.post(this.url + location, tuple).subscribe(data => func(data))
    }

  constructor(private http: HttpClient, private url: string) { }
}