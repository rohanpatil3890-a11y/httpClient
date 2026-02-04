import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoderService } from './loder.service';

@Injectable()
export class ApiInterseptorInterceptor implements HttpInterceptor {

  private _loderService  = inject(LoderService)

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this._loderService.loadingStatus.next(true);
    const reqClone = request.clone({
      setHeaders : {
        'auth' : 'JWT token witch was stored in LS'
      }
    })

    return next.handle(reqClone)
    .pipe(
      finalize(() =>{
         this._loderService.loadingStatus.next(false);
      })
    )
  }
}
