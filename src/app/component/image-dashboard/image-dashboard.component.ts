import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-image-dashboard',
  templateUrl: './image-dashboard.component.html',
  styleUrls: ['./image-dashboard.component.scss']
})
export class ImageDashboardComponent implements OnInit {

ImgArr : Array<Image> = []

  constructor(private _imageSrvice : ImageService,
    private _SnackBar : SnackbarService
  ) { }

  ngOnInit(): void {
   this.fetchAllImge();
   this.AddNewImgArr();
   this.removeObjInArr();
   this.UpdateObjInArr();
  }

  fetchAllImge(){
    this._imageSrvice.fetchAllImg().subscribe({
      next : data => {
        this.ImgArr = data
        
      },error : err => {
        console.log(err)   
      }
    })
  }

  trackById(index : number, img : Image){
    return img.imgId
  }

  AddNewImgArr(){
    this._imageSrvice.CreateNewSubObs$.subscribe({
      next : data => {
        console.log(data);

        this.ImgArr.unshift(data);
        this._SnackBar.snackBar(`Image with id ${data.imgId} is created successfully`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }
  
  removeObjInArr(){
    this._imageSrvice.RemoveSubObj$.subscribe({
      next : data => {
        let getIndex = this.ImgArr.findIndex(p => p.imgId = data);
        this.ImgArr.splice(getIndex,1)
        this._SnackBar.snackBar(`Image with id ${data} is removed successfully`)
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  UpdateObjInArr(){
    this._imageSrvice.UpdateObjSubObs$.subscribe({
      next : data => {
        console.log(data);
        let getIndex  = this.ImgArr.findIndex(p => p.imgId === data.imgId);
        this.ImgArr[getIndex] = data
        this._SnackBar.snackBar(`Image with id ${data.imgId} is update successfully`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

}
