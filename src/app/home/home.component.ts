import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from './models/home.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  list;
  constructor(private _postService: PostService) {}
  ngOnInit(): void {
    this._postService.getPosts().subscribe((res: any) => {
      this.posts = res;
      console.log('--res--this.posts---', res, this.posts);
    });
    this._postService.subject.next(345);
    this._postService.getList().subscribe((res: any) => {
      this.list = res;
      console.log('--res--this.list-sdfsdf--', this.list);
    });
  }
}
