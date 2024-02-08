import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../home/models/home.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  post: any;
  constructor(
    private _postService: PostService,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this._postService.getPost(id).subscribe((res) => (this.post = res));
    });
    console.log('=====', this.post);
    this._postService.subject.subscribe((data) => {
      console.log('--behaviour subject---data-----',data);
    });
  }
}
