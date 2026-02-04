import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  postArr: Array<any> = []

  constructor(private postservice: PostService,
    private _snackBarservice : SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetchAllpost()
    

    this.addPost()
    this.onremove()
    this.onUpdateArr()
  }

  onremove(){
    this.postservice.removepost$.subscribe(res => {
      let getIndex = this.postArr.findIndex(p => p.id === res)
      this.postArr.splice(getIndex,1)
       this._snackBarservice.snackBar(`The post with id ${res} is removed successfully !!!`)
    })
  }

  addPost() {

    this.postservice.addPost$.subscribe(res => {

      this.postArr.push(res);
      this._snackBarservice.snackBar(`The post with id ${res.id} is created successfully !!!`)
    })
  }

  fetchAllpost() {
    this.postservice.fetchAllData()
      .subscribe({
        next: data => {

          for (const key in data) {

            this.postArr.push({ ...data[key], id: key })
          }

        },
        error: err => {
          console.log(err);

        }
      })
  }

  onUpdateArr(){
    this.postservice.UpdatedPostSubObj.subscribe({
      next : data => {
        console.log(data);
        
        let getIndex = this.postArr.findIndex(p => p.id === data.id);
        this.postArr[getIndex] = data
        this._snackBarservice.snackBar(`The post with id ${data.id} is updated successfully !!!`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

}
