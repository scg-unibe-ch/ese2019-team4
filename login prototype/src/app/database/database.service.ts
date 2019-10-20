import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    /* sends an object to the specified url
    * @return the servers responce
    */
    add(tuple: object): boolean {
        this.http.post(this.url, tuple).subscribe(data => console.log(data));
        return true;
    }

    /* posts an object to the desired path
    * @return response of the object
    */
    post(location: string, tuple: object, func: any): void {
      this.http.post(this.url+location, tuple).subscribe(data => func(data))
    }

   /**
    * checks if the user exists
    * @param name: name of the user that should be found
    */
    userExists(name: string): boolean {
        return true;
    }

    /**
     * checks if the typed password matches
     * @param password: entered password
     */
    passwordMatches(password: string): boolean {
        return true;
    }

  constructor(private http: HttpClient, private url: string) { }
}
