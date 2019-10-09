/**
* Registration field for customers
*/

import { Component, OnInit, Input } from '@angular/core';
import { DatabaseComponent } from "../database/database.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error = null;
  customer = {};
  @Input() database: DatabaseComponent;

  register(name: string, password: string, password_verify: string) {
      if (name == null || password == null)
        this.error = "No whitespaces allowed!"
      else if (password != password_verify)
        this.error = "Passwords are not the same!"
      else if (this.database.customer_exists(name))
        this.error = "Username already exists!"
      else {
        this.database.add_customer(name, password);
        this.error = null;
        console.log(this.database.names)
      }
    }


  constructor() { }

  ngOnInit() {
  }

}
