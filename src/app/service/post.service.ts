import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  addPost$: Subject<Ipost> = new Subject<Ipost>()

   removepost$ : Subject<string> = new Subject<string>()

 private EditPost$ : Subject<Ipost> = new Subject<Ipost>();
  EditPostSubObj$ : Observable<Ipost> = this.EditPost$.asObservable()

  private UpdatedPost$ : Subject<Ipost> = new Subject<Ipost>()
  UpdatedPostSubObj : Observable<Ipost> = this.UpdatedPost$.asObservable()
  constructor(private _http: HttpClient) { }

  BASE_URL: string = environment.BASE_URL;
  POST_URL: string = `${this.BASE_URL}/post.json`;

  setUpdateObj(updatepost : Ipost){
    this.UpdatedPost$.next(updatepost)
  }

  setEditPodt(post : Ipost){
    this.EditPost$.next(post)
  }

  fetchAllData(): Observable<any> {
    return this._http.get<Observable<any>>(this.POST_URL);

  }

  AddPost(post: Ipost): Observable<any> {
    return this._http.post<Observable<Ipost>>(this.POST_URL, post);
  }

  RemovePost(id : string): Observable<any>{
    return this._http.delete<string>(`${this.BASE_URL}/post/${id}.json`)
  }

  updatePost(updatedPost : any) : Observable<Ipost>{
    let Update_url = `${this.BASE_URL}/post/${updatedPost.id}.json`;
   return this._http.patch<Ipost>(Update_url,updatedPost,{
    headers : {
      "auth" : 'Token for LS'
    }
   })
  }
}
