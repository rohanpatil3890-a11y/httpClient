import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

private  CreateNewSub$ : Subject<Image> = new Subject<Image>();
 CreateNewSubObs$ : Observable<Image> = this.CreateNewSub$.asObservable()

 private RemoveSub$ : Subject<string> = new Subject<string>();
 RemoveSubObj$ : Observable<string> = this.RemoveSub$.asObservable(); 

 private EditObjSub$ : Subject<Image> = new Subject<Image>();
 EditObjSubObs$ : Observable<Image> = this.EditObjSub$.asObservable();

 private UpdateObjSub$ : Subject<Image> = new Subject<Image>();
UpdateObjSubObs$ : Observable<Image> = this.UpdateObjSub$.asObservable();


  BASE_URL : string = environment.BASE_URL
  IMAGE_URL : string = `${this.BASE_URL}/image.json`

  constructor(private _http : HttpClient) { }

  UpdateObjEmit(Img : Image){
  this.UpdateObjSub$.next(Img)
  }

  EmitNewObj(Img : Image){
    this.CreateNewSub$.next(Img)
  }

  RemoveEMitObj(id : string){
    this.RemoveSub$.next(id)
  }

  EditNewObj(img : Image){
   this.EditObjSub$.next(img)
  }



  fetchAllImg() : Observable<any>{
   return this._http.get<any>(this.IMAGE_URL).pipe(
    map((obj : any)=> {
      let ImgArr = [];
      for(const key in obj){
        ImgArr.push({...obj[key], imgId : key})
      }
      return ImgArr
    })
   )
  }

  CreateNewImage(Img : Image) : Observable<any>{
  return this._http.post(this.IMAGE_URL, Img)
  }


  removeImg(id : string): Observable<string>{
    return this._http.delete<string>(`${this.BASE_URL}/image/${id}.json`);
  }

  UpdateObj(Img : Image) : Observable<Image>{
  let UPDATE_URL : string = `${this.BASE_URL}/image/${Img.imgId}.json`;
  return this._http.patch<Image>(UPDATE_URL,Img)
  }
}
