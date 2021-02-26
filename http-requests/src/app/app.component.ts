import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Post } from './posts.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching=false;
  errorStatus=null;

  constructor(private http: HttpClient,
              private postsService:PostsService) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.postsService.createAndStorePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
    
  }
  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(
        () => {
          this.loadedPosts = [];
        }
      );
  }

  fetchPost(){
    this.isFetching=true;
    this.postsService.fetchPosts()
      .subscribe(
        (posts)=>{
          this.loadedPosts =posts;
          this.isFetching=false;
        },
        (error)=>{
          this.isFetching=false;
          this.errorStatus = error.message;
          ;
          console.log(this.errorStatus);
        }
      );
  }

  onHandleError(){
    this.errorStatus=null;
  }

}
