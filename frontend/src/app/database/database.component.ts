/** Displays database tables from the backend */
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})


export class DatabaseComponent implements OnInit {
  @Input() url: string;
  table: Object;

  update() {
      // updates the database table from the url
      this.http.get(this.url).subscribe(data => this.table = data);
      console.log('updated table');
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}