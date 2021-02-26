import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { Post } from './posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  createAndStorePost(postData:Post){
    console.log(postData);

    this.http.post<{name:string}>('https://angular-test-e080d-default-rtdb.firebaseio.com/posts.json',
                                    postData,
                                    {
                                      observe: 'response'
                                    }
    )
      .subscribe(
        responseData => {
          console.log(responseData);
        }
      );
  }

  fetchPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print','pretty');
    searchParams = searchParams.append('abc','xyz');

    return this.http.get<{[key:string]:Post}>('https://angular-test-e080d-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({
            'custom-header':'hello',
            'abc':'xyz'
          }),
          params: searchParams
      
      })
        .pipe(map(
          (responseData)=>{
            const postArray:Post[] = [];
            for (let key in responseData){
              // console.log(key);
              if(responseData.hasOwnProperty(key)){
                postArray.push({...responseData[key],id:key});
              }
            }
            return postArray;
          }
        ),
        catchError(
          (errorRes)=>{
            return throwError(errorRes);
          }
        )
        );
  }

  deletePosts(){
    return this.http.delete('https://angular-test-e080d-default-rtdb.firebaseio.com/posts.json');
  }


}
