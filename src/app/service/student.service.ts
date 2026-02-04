import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Istudent } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
 private newStudentSub$ : Subject<Istudent> = new Subject<Istudent>()
    newStudentSubObs$ : Observable<Istudent> = this.newStudentSub$.asObservable();

   private RemoveStdSub$ : Subject<string> = new Subject<string>();
   RemoveStdSubObj$ : Observable<string> = this.RemoveStdSub$.asObservable();

   private EditStdSub$ : Subject<Istudent> = new Subject<Istudent>();
   EditStdSubObs$ : Observable<Istudent> = this.EditStdSub$.asObservable();

   private UpdateStdSub$ : Subject<Istudent> = new Subject<Istudent>();
   UpdateStdSubObs$ : Observable<Istudent> = this.UpdateStdSub$.asObservable();
   

  BASE_URL : string = environment.BASE_URL;
  STD_URL : string = `${this.BASE_URL}/student.json`
  constructor(private _http : HttpClient) { }

  fetchAllStd() : Observable<any>{
  return this._http.get(this.STD_URL).pipe(
    map((obj : any)=>{
      let stdArr = []
      for(const key in obj){
        stdArr.push({...obj[key], stdId:key})
      }
      return stdArr
    })
  )
  }

  SendUpdateObj(UpdateObj : Istudent){
    return this.UpdateStdSub$.next(UpdateObj);
  }


  SendEditObj(std : Istudent){
    return this.EditStdSub$.next(std)
  }

  sendRemoveStd(id : string){
    this.RemoveStdSub$.next(id)
  }
  
  sendData$(std : Istudent){
    return this.newStudentSub$.next(std)
  }

  creatNewObj(std : Istudent): Observable<any>{
    return this._http.post(this.STD_URL, std)
  }

  removeStd(id : string): Observable<string>{
    return this._http.delete<string>(`${this.BASE_URL}/student/${id}.json`);
  }

  updateStd(updateStd : Istudent){
    let UPDATE_URL : string = `${this.BASE_URL}/student/${updateStd.stdId}.json`;
    return this._http.patch<Istudent>(UPDATE_URL,updateStd)

  }

  
  
}
