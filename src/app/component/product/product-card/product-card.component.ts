import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Iproduct } from 'src/app/model/product/product';
import { ProductService } from 'src/app/service/product.service';
import { GetconformComponent } from '../../getconform/getconform.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    constructor(private _matiDiloge : MatDialog,
    private _productService : ProductService
  ) { }

  @Input() p !: Iproduct

  ngOnInit(): void {
  }

  onRemove(){
  let matconfig = new MatDialogConfig();
  matconfig.data = `Are you sure, you want to remove product with id ${this.p.id}`;
  matconfig.disableClose = true

  let matDilogRef = this._matiDiloge.open(GetconformComponent,matconfig)
  matDilogRef.afterClosed().subscribe(flag => {
    if(flag == true){
      this._productService.RemoveProduct(this.p.id).subscribe({
        next : data =>{
        this._productService.EmitRemoveId(this.p.id)
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  })
  }

  onEdit(){
    this._productService.EmitEditObj(this.p)
  }


}
