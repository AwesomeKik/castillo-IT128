import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  private routeSub: Subscription = new Subscription();
  private id: number = 0;

  post?: Post;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => 
      {this.id = params['id'];})
    this.initData();
  }

  initData(): void {
    this.http.get<Post>("https://localhost:7182/api/post/" + this.id).subscribe({
      next: (data: Post) => {
        this.post = data; console.log(this.post);
      }
    })
  }
}


