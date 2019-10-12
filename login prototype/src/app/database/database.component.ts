/** Mock class for databases
* Provides functionality to store usernames and passwords
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})


export class DatabaseComponent implements OnInit {
  server = "http://localhost:3001"
  table: Object;

  customer_exists(name: string) {
      return false;
  }

  update() {
      this.http.get(this.server + "/" + this.table_name).subscribe(data => this.table = data);
  }

  /* Adds customer to database
  * @Precondition: name and password are not null and the name does not exist yet.
  */
  add_customer(name: string, password: string) {
      if (name == null || password == null)
        console.log("Error");
      else {
        this.http.post(this.server+"/account/", {"password": password, "username": name}).subscribe(data => console.log(data));
      }
  }

  constructor(private http: HttpClient, private table_name: String) { }

  ngOnInit() {
  }

}
