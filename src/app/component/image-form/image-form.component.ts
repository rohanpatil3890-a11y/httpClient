import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit {


  albumIdArr = [1,2,3,4,5,6,7,8,9,10]
  
  constructor(private _ImageService : ImageService) { }

  ImageForm !: FormGroup

  IsInEditMode : boolean = false;
  EditId !: string 

  ngOnInit(): void {


   this.imgForm();

   this._ImageService.EditObjSubObs$.subscribe({
    next : data => {
      console.log(data);
      this.ImageForm.patchValue(data)
      this.IsInEditMode = true;
      this.EditId = data.imgId

      
    },
    error : err => {
      console.log(err);
      
    }
   })
  
  }

  imgForm() {
    this.ImageForm = new FormGroup({
      title: new FormControl(null, [Validators.required], []),
      albumId: new FormControl(null, [Validators.required], []),
      imgUrl: new FormControl(null, [Validators.required], [])
    })
  }

  get imageFormControls(){
    return this.ImageForm.controls
  }

 
OnAddNewImg(){
if(this.ImageForm.valid){
  let Obj : Image = {
    ...this.ImageForm.value
  }

  this._ImageService.CreateNewImage(Obj).subscribe({
    next : data => {
      console.log(data);
      
      this._ImageService.EmitNewObj({...Obj, imgId : data.name})
      this.ImageForm.reset();
      console.log(data);
      
    },
    error : err => {
      console.log(err);
      
    }
  })
}
}
onUpdate(){
if(this.ImageForm.valid){
  let UPDATE_OBJ : Image = {
    ...this.ImageForm.value,
    imgId : this.EditId
  }

  this._ImageService.UpdateObj(UPDATE_OBJ)
  .subscribe({
    next : data => {
      console.log(data);
      this._ImageService.UpdateObjEmit(data)
      this.IsInEditMode = false;
      this.ImageForm.reset();
      
    },
    error : err => {
      console.log(err);
      
    }
  })
}
}

 

}
