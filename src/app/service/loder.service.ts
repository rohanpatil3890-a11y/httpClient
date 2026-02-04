import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoderService {

  constructor() { }

  loadingStatus : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
