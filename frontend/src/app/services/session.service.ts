import {Injectable} from '@angular/core';
import {DatabaseService} from './database/database.service'
import {HttpClient} from '@angular/common/http';
import {PostService} from './post/post.service';


/**
* Provides the session information
* It is muted by the authentication service
*/
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  backend_url = 'http://localhost:3001/'; // has to be configured here! (the url to the backend server)

  database = this.db.connect(this.backend_url+"customer/");
  info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
          "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
  username = this.info.username;
  type = this.info.type;
  token = this.info.token;
  expires_at = this.info.expires_at;
  posts: Array<any>; //all posts
  myPosts: Array<any>; //posts of the current user

  updatePosts(){
    this.postService.getPosts().subscribe(data => {
      this.posts = data['instances'];
    });
    if (this.isProvider()){
      this.postService.getUserPosts(this.username).subscribe(data => {
        this.myPosts = data['instances'];
      });
    } else {
      this.postService.getSubscribedPosts(this.username).subscribe(data => {
        this.myPosts = data['instances'];
      });
    }
  }

  authenticate(success: any){
    console.log("authentication: "+success);
  }

  toggleDark(){
    if (localStorage.getItem("theme") === null) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', "dark");
    }
    else {
      document.body.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }

  // communicates with the backend and logs a user in
  login(name: string, password: string) {
    var func = function(res) {
      if (res == false) {
        console.log("Error: invalid in authentication")
      }
      else {
        this.setSession(res)
      }
    }.bind(this)
    this.database.post({"username": name, "password": password}, func, "login")
  }

  private setSession(authResult) {

      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('type', authResult.type);
      localStorage.setItem('username', authResult.username);
      this.update()
      this.updatePosts();
  }

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem('type');
      localStorage.removeItem('username');
      this.update()
      this.updatePosts();
  }

  update() {
    // logs out if the expiration time is exceeded
    /*if (!moment().isBefore(this.getExpiration())){
      this.logout();
    }*/
    // is updated by the login service on login or logout
    this.info = {"username": localStorage.getItem("username"), "type": localStorage.getItem("type"),
            "token": localStorage.getItem("id_token"), "expires_at": localStorage.getItem("expires_at")}
    this.username = this.info.username;
    this.type = this.info.type;
    this.token = this.info.token;
  }

  public isLoggedIn() {
    // checks if someone is logged in, if a value cannot be found in the local storage, it is set to null
    this.update()
    return (localStorage.getItem("username") !== null);
  }

  public isProvider() {
    return (localStorage.getItem("type") == "provider");
  }


  constructor(private http: HttpClient, private postService: PostService,
  private db:DatabaseService) {
    //set theme
    if (localStorage.getItem("theme") == "dark") {

        document.body.classList.add('dark');
    }
  }
}
