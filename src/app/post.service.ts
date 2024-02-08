import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, groupBy, map, mergeMap, of, toArray } from 'rxjs';
import { Post } from './home/models/home.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  result: any;
  constructor(private _http: HttpClient) {}
  subject = new BehaviorSubject(123);
  getPosts() {
    // return of([])
    return this._http
      .get('/api/posts')
      .pipe(map((result) => (this.result = result)));
  }
  getPost(id: any) {
    return this._http
      .get('/api/details/' + id)
      .pipe(map((result) => (this.result = result)));
  }
  insertPost(post: Post) {
    // let headers = new Headers({ 'content-Type': 'application/json' });
    const options = {
      headers: new HttpHeaders().append('key', 'value'),
      params: new HttpParams().append('key', 'value'),
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };

    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    const body = { title: 'Angular POST Request Example' };
    this._http.post<any>('/api/posts', post, { headers }).subscribe((data) => {
      console.log('dataaaaaaaaaaaaaaaa', data);
    });
  }
  getList() {
    of(
      {id: 1, name: 'Mike', age: 22},
      {id: 2, name: 'John', age: 34},
      {id: 3, name: 'Sarah', age: 22},
      {id: 4, name: 'Jason', age: 31},
      {id: 5, name: 'Joe', age: 22},
      {id: 6, name: 'Samantha', age: 31}
    ).pipe(
      groupBy(p => p.age),
      mergeMap((people) => people.pipe(toArray()))
    )
    .subscribe(people => console.log(people));
    return this._http
      .get('https://run.mocky.io/v3/e0f6482d-544a-4cf0-abe3-1053b70b6b50')
      .pipe(map((result) => (this.result = result)));
  }
}
