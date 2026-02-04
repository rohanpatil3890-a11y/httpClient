import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Image } from 'src/app/model/image';
import { GetconformComponent } from '../getconform/getconform.component';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  @Input() imageObj !: Image

  constructor(
    private _ImgService : ImageService,
    private _MatDilog : MatDialog,
    
  ) { }


  ngOnInit(): void {
  }

  onEdit(img : Image){
this._ImgService.EditNewObj(img)
  }

  onRemove(id : string){
   let config = new  MatDialogConfig();
   config.disableClose = true;
   config.data = `Are you sure you want to remove img with id ${id}`

   let marDilogRef = this._MatDilog.open(GetconformComponent,config)

   marDilogRef.afterClosed().subscribe(flag => {
    if(flag == true){
      this._ImgService.removeImg(id)
      .subscribe({
        next : data => {
          console.log(id);
          this._ImgService.RemoveEMitObj(id)
          
        },
        error : err => {
          console.log(err);
          
        }
      })
    }
   })
  }



}
