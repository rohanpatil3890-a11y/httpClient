import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../model/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   BASE_URL = environment.BASE_URL;
  PRODUCT_URL : string = `${this.BASE_URL}/product.json`;

  constructor(private _http : HttpClient) { }

  private AddNewProdSub : Subject<Iproduct> = new Subject<Iproduct>();
  AddNewProdSubObs : Observable<Iproduct> = this.AddNewProdSub.asObservable();

  
  private RemoveObjSub : Subject<string> = new Subject<string>();
  RemoveObjSubObs : Observable<string> = this.RemoveObjSub.asObservable();

   private EditObjSub : Subject<Iproduct> = new Subject<Iproduct>();
  EditObjSubObs$ : Observable<Iproduct> = this.EditObjSub.asObservable();

  private UpdateObSub : Subject<Iproduct> = new Subject<Iproduct>();
  UpdateObSubObs$ : Observable<Iproduct> = this.UpdateObSub.asObservable();


  EmitAddObj(product : Iproduct){
    this.AddNewProdSub.next(product)
  }

  EmitRemoveId(id : string){
    this.RemoveObjSub.next(id)
  }

  EmitEditObj(product : Iproduct){
    this.EditObjSub.next(product)
  }

  EmitUpdateObj(product : Iproduct){
    this.UpdateObSub.next(product)
  }

  fetchAllProduct(): Observable<any>{
   return this._http.get<any>(this.PRODUCT_URL).pipe(
    map((obj : any) =>{
      let productArr = []
      for(const key in obj){
        productArr.push({...obj[key], id : key})
      }
      return productArr
    })
   )
  }

  AddNewObj(product : Iproduct): Observable<any>{
    return this._http.post<any>(this.PRODUCT_URL,product)
  }

  RemoveProduct(id : string): Observable<any>{
    return this._http.delete(`${this.BASE_URL}/product/${id}.json`);
  }

  Update(product : Iproduct): Observable<Iproduct>{
    let UPDATE_URL = `${this.BASE_URL}/todo/${product.id}.json`;
    return this._http.patch<Iproduct>(UPDATE_URL,product)
  }
}
