import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    /* sends an object to the specified url
    * @return the servers responce
    */
    add(tuple: Object): boolean {
        this.http.post(this.url, tuple).subscribe(data => console.log(data));
        return true;
    }

  constructor(private http: HttpClient, private url: string) { }
}
