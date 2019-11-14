import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Post } from './post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private REST_API_SERVER = 'http://localhost:3001/posts';
  public getPosts(): Observable<Object> {
    return this.http
      .get(this.REST_API_SERVER);
  }
  constructor(private http: HttpClient) {}
}
