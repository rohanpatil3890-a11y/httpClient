import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itodos } from '../model/todo';
import { LoderService } from './loder.service';


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private _http : HttpClient,
    private _loaderService : LoderService
  ) { }

  BASE_URL_TODO  = environment.BASE_URL;
  POST_URL_TODO = `${this.BASE_URL_TODO}/todo.json`;

 private AddTodoData$ : Subject<Itodos> = new Subject<Itodos>()
 AddTodoDatasubObj$ : Observable<Itodos> = this.AddTodoData$.asObservable();

private RemoveTodo$ : Subject<string> = new Subject<string>();
RemoveTodosubObj$ : Observable<string> = this.RemoveTodo$.asObservable();

private EditObjsub$ : Subject<Itodos> = new Subject<Itodos>();
EditObjSubObs$ : Observable<Itodos> = this.EditObjsub$.asObservable();

private UpdateObjSub$ : Subject<Itodos> = new Subject<Itodos>();
UpdateObjSubObj$ : Observable<Itodos> = this.UpdateObjSub$.asObservable();

// EditTodoSub

UpdatedObj$(todo : Itodos){
 return this.UpdateObjSub$.next(todo)
}

  EditObjSend$(todo : Itodos){
   return this.EditObjsub$.next(todo)
  }

   sendRemoveId$(id : string){
    return this.RemoveTodo$.next(id)
   }

   sendData(todo : Itodos){
    return this.AddTodoData$.next(todo)
   }

  fetchAllTodos() : Observable<any>{
    this._loaderService.loadingStatus.next(true)
    return this._http.get<Observable<any>>(this.POST_URL_TODO)
  }

  AddTodo(todo : Itodos) : Observable<any>{
   return this._http.post<Observable<Itodos>>(this.POST_URL_TODO, todo)
  }

  removeTodo(id : string) : Observable<any>{
  return this._http.delete<string>(`${this.BASE_URL_TODO}/todo/${id}.json`)
  }

  updateTodo(updatedTodo : Itodos) : Observable<Itodos>{
    let UPDATE_URL : string = `${this.BASE_URL_TODO}/todo/${updatedTodo.todoId}.json`;
   return this._http.patch<Itodos>(UPDATE_URL,updatedTodo,{
    headers : {
      "auth" : 'Token For LS'
    }
   })

   
  }


 


}
