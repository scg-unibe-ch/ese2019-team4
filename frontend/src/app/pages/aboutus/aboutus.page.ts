import {Component, OnInit} from '@angular/core';

/**
 * The aboutUs Page, which just contains information about all of us. You can access
 * it from the menu by clicking on the before last menu item. We would change the information
 * depending on the actual employees.
 */
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
