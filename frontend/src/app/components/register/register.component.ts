import {Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from '../../services/database/database.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

/**
 * The register component which has 3 to 4 input fields, the username,
 * the password, the confirmation password and the email, which only providers
 * have to provide. Whether you register as a consumer or provider depends on the checkbox.
 * The component checks all of the inputs, depending on their correctness and if
 * all of them are correct, then the inputs are passed on to the backend.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private alertController: AlertController,
              private db: DatabaseService) { }
  @Input()
  isProvider = false;
  URL = 'http://localhost:3001/costumer';
  DATABASE_URL: string;
  database = null;
  error = null;
  customer = {email: ''};
  entryField = 'password';
  iconType = 'eye';
  // created a subfunction for input validation, added redirect
  register(name: string, password: string, PASSWORD_VERIFY: string, email: string) {
    if (this.dataCheck(name, password, PASSWORD_VERIFY, email)) {
      const func = function(success) {
        if (success) {
          this.error = 'Registration successful!';
          this.alertController.create({header: 'Registration successful!',
            buttons: [
              {text: 'Okay',
                handler: () => {
                  this.router.navigate(['./login-user']);
                }}
            ]}
          ).then(alertEl => {
            alertEl.present();
          });
        } else {
          document.documentElement.style.setProperty('--name-color', '#f04141' );
          this.error = 'User already exists';
        }
      }.bind(this);
      console.log('sending ' + {username: name, password, email});
      this.database.post({username: name, password, email}, func);
    }

  }
  url() {
    if (this.isProvider) {
      this.URL = 'http://localhost:3001/provider';
    } else {
      this.URL = 'http://localhost:3001/customer';
    }
    this.database = this.db.connect(this.URL);
    this.DATABASE_URL = this.URL;
  }

  ngOnInit() {
  }

  /**
   * A very long method to makes sure that nothing goes wrong in the registration.
   * If wrong data is entered an according error is thrown and the color of the input field changes
   * if everything is correct you get a pop up stating registration successful and get routed to the login
   * @param name The Username, which the user desires
   * @param password The password to match the username
   * @param PASSWORD_VERIFY A repetition of the password, to make sure that the user didn't mistype
   * @param email An email address, which is only required from the providers
   */
  dataCheck(name: string, password: string, PASSWORD_VERIFY: string, email: string) {
    const elem = document.documentElement.style;
    // regular expression for valid emails
    const validEmail = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    // variables to show the user, which data is wrong
    const colorMedium = '#989aa2';
    const colorDanger = '#f04141';
    const colorSuccess = '#2fdf75';
    let bool = true;
    // a simple function that checks for empty fields
    function whiteSpaceCheck(anything: string) {
      if (anything == null || anything === '' ) {
        return true;
      } else { return false; }
    }
    // Resets input field colors
    elem.setProperty('--name-color', colorMedium );
    elem.setProperty('--password-color', colorMedium );
    elem.setProperty('--confirmPassword-color', colorMedium );
    // Changes color of input fields depending on correct/false input
    if (whiteSpaceCheck(name)) {
      elem.setProperty('--name-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--name-color', colorSuccess ); }
    if (whiteSpaceCheck(password)) {
      elem.setProperty('--password-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--password-color', colorSuccess ); }
    if (whiteSpaceCheck(PASSWORD_VERIFY)) {
      elem.setProperty('--confirmPassword-color', colorDanger );
      this.error = 'No whitespaces allowed!';
      bool = false;
    } else {elem.setProperty('--confirmPassword-color', colorSuccess ); }
    if (password !== PASSWORD_VERIFY) {
      elem.setProperty('--confirmPassword-color', colorDanger );
      this.error = 'Passwords are not the same!';
      bool = false;
    } else if ( bool !== false ) {
      elem.setProperty('--confirmPassword-color', colorSuccess );
    }
    // checks if the email is valid and changes the color accordingly
    if (this.isProvider) {
      if (!validEmail.test(email)) {
        this.error = 'Invalid email';
        bool = false;
        elem.setProperty('--email-color', colorDanger );
      } else { elem.setProperty('--email-color', colorSuccess ); }
    } else { elem.setProperty('--email-color', colorDanger ); }
    return bool;
  }
  // sets the focus for to the next entry field
  nextSetFocus(focus) {
    focus.setFocus();
  }
  // On confirm password field you can either register right away or go to email if you're a provider
  focusOrRegister(focus, name, password, passwordVerify, email) {
    if (this.isProvider) {
      focus.setFocus();
    } else {
      this.url();
      this.register(name, password, passwordVerify, email);
    }
  }

  // makes the password visible or not and adapts the icon once clicked on
  entryFieldChange() {
    if (this.entryField === 'password') {
      this.entryField = '';
      this.iconType = 'eye-off';
    } else {
      this.entryField = 'password';
      this.iconType = 'eye';
    }
  }
}
