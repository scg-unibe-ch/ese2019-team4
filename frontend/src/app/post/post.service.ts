import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Post } from './post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private REST_API_SERVER = 'http://localhost:3001/posts';

  getPosts(): Observable<HttpResponse<Array<Post>>> {
    return this.httpClient.get<Array<Post>>(
      this.REST_API_SERVER, {
        observe: 'response'
      });
  }

  constructor(private httpClient: HttpClient) {}
}
