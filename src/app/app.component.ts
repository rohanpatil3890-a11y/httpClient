import { Component, inject, OnInit } from '@angular/core';
import { LoderService } from './service/loder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpClient';
  isLoadeng : boolean = false;
  private _loaderService = inject(LoderService);

  ngOnInit(): void {
    this._loaderService.loadingStatus
    .subscribe(flag => {
      this.isLoadeng = flag
    })
  }

}
