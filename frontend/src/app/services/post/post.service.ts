import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {Observable} from 'rxjs';

/**
 * The post service handles different kind of requests regarding posts
 */
@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit {
  private REST_API_SERVER = 'http://localhost:3001/posts/';
  public posts: Post [];

  public getPosts(): Observable<Object> {
    return this.http
      .get(this.REST_API_SERVER);
  }

  /**
   * Return the post with a specific id
   * @param postId, id of the post that should be found
   */
  getPostLocal(postId: number) {
    return {
      ...this.posts.find(post => {
        return post.id === postId;
      })
    };
  }
  public getPost(id: number): Observable<Object> {
    return this.http.get(this.REST_API_SERVER + id);
  }
  public getSubscribedPosts(USER: string): Observable<Object> {
    return this.http.get(this.REST_API_SERVER + 'subscriptions/'+USER);
  }
  public getUserPosts(USER: string): Observable<Object> {
    return this.http.get(this.REST_API_SERVER + 'profile/' + USER);
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPosts().subscribe(data => {
      console.log('1');
      this.posts = data['instances'];
    });
  }
}
