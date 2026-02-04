import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
import { GetconformComponent } from '../getconform/getconform.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() postObj!: Ipost
  constructor(private postService: PostService,
    private _matDilog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onRemove(id: string) {

    let matConfig = new MatDialogConfig()

    matConfig.data = `Are you sure, you want to remove post with id ${id}`;

    let matDilogRef = this._matDilog.open(GetconformComponent, matConfig);

   matDilogRef.afterClosed()
   .pipe(
    filter(flag => flag == true),
    switchMap(() => {
      return this.postService.RemovePost(id)
    })
   )
   .subscribe({
    next : data => {
      this.postService.removepost$.next(id)
    },
    error : err =>{
      console.log(err);
      
    }
   })
  }

  onEdit(){
    this.postService.setEditPodt(this.postObj)
  }

}
