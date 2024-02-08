import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Post } from '../home/models/home.interface';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  constructor(
    private _postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private _http: HttpClient
  ) {}
  ngOnInit(): void {
    this._postService.getPosts().subscribe((res: Post[]) => (this.posts = res));
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(75),
      ]),
      url: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(500),
      ]),
      detailed_description: new FormControl('', [
        Validators.required,
        Validators.minLength(200),
        Validators.maxLength(1000),
      ]),
    });
  }

  addPost(post: Post) {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    this._http.post<any>('/api/post', post, { headers }).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }
}
