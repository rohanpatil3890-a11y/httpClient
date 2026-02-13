import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from 'src/app/model/product/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  
  constructor(private _productService : ProductService){}

  productform!: FormGroup;

  isinEditMode : boolean = false
  EditId !: string 
  ngOnInit(): void {
    this.createFormControls();
    this.patchValueForm()
  }

  createFormControls() {
    this.productform = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required),
    });
  }

  AddProductCard() {
    if (this.productform.valid) {
      let Obj = this.productform.value

      this._productService.AddNewObj(Obj).subscribe({
        next :data =>{
          console.log(data);
          this._productService.EmitAddObj({...Obj, id : data.name});
          this.productform.reset()
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  }

  patchValueForm(){
    this._productService.EditObjSubObs$.subscribe({
      next : data =>{
        console.log(data);
        this.productform.patchValue(data);
        this.isinEditMode = true
        this.EditId = data.id
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  onUpdate(){
    if(this.productform.valid){
      let UPDATE_OBJ : Iproduct = {...this.productform.value, id :this.EditId};
      this._productService.Update(UPDATE_OBJ).subscribe({
        next : data =>{
          console.log(data);
           this._productService.EmitUpdateObj(UPDATE_OBJ)
           this.productform.reset();
           this.isinEditMode = false
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  }


}
