import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/model/product/product';
import { ProductService } from 'src/app/service/product.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {

  
  constructor(private ProductService: ProductService,
    private _snckBar: SnackbarService
  ) { }

  productArr: Iproduct[] = []

  ngOnInit(): void {
    this.fetchAllProduct()
    this.AddNewObjArr();
    this.removeObjArr();
    this.UpdateObjArr();
  }

  trackById(index: number, product: Iproduct) {
    return product.id
  }

  fetchAllProduct() {
    this.ProductService.fetchAllProduct().subscribe({
      next: data => {
        console.log(data);
        this.productArr = data
      },
      error: err => {
        console.log(err);

      }
    })
  }

  AddNewObjArr() {
    this.ProductService.AddNewProdSubObs.subscribe({
      next: data => {
        console.log(data);
        this.productArr.push(data)
        this._snckBar.snackBar(`The movie with id ${data.id} is created successfully`)


      },
      error: err => {
        console.log(err);

      }
    })
  }

  removeObjArr() {
    this.ProductService.RemoveObjSubObs.subscribe({
      next: data => {
        let getIndex = this.productArr.findIndex(p => p.id === data);
        this.productArr.splice(getIndex, 1)
        this._snckBar.snackBar(`The movie with id ${data} is Removed successfully`)
      },
      error: err => {
        console.log(err);

      }
    })
  }

  UpdateObjArr() {
    this.ProductService.UpdateObSubObs$.subscribe({
      next: data => {
        console.log(data);
        let getIndex = this.productArr.findIndex(p => p.id === data.id);
        this.productArr[getIndex] = data;
        this._snckBar.snackBar(`The movie with id ${data.id} is updated successfully`)
      },
      error: err => {
        console.log(err);

      }
    })
  }


}
