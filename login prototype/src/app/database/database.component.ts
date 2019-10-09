/** Mock class for databases
* Provides functionality to store usernames and passwords
*/
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})


export class DatabaseComponent implements OnInit {
  @HostBinding("class.is-open")

  names = ["Narco", "Marca", "Dynama"];
  passwords = ["pw", "qwert", "12345"];

  customer_exists(name: string) {
      return this.names.includes(name);
  }

  update() {
      console.log(this.names)
  }

  /* Adds customer to database
  * @Precondition: name and password are not null and the name does not exist yet.
  */
  add_customer(name: string, password: string) {
      if (name == null || password == null || this.names.includes(name))
        console.log("Error");
      else {
        this.names.push(name);
        this.passwords.push(password);
      }
  }

  constructor() { }

  ngOnInit() {
  }

}
