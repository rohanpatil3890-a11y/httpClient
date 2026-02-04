import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ipost } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  constructor(private postService: PostService) { }

  postForm !: FormGroup

  isinEditMode : boolean = false

  EditId !: string 

  ngOnInit(): void {
    this.createPostForm()
    this.postService.EditPostSubObj$.subscribe({
      next : data => {
        console.log(data);
        this.postForm.patchValue(data)
        this.isinEditMode = true;
        this.EditId = data.id
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, []),
      body: new FormControl(null, []),
      userId: new FormControl(null, [])
    })
  }

  onAdd() {

    if (this.postForm.valid) {
      let Obj: Ipost = {
        ...this.postForm.value,
      }
      this.postService.AddPost(Obj)
        .subscribe(res => {

          Obj.id = res.name
          this.postService.addPost$.next(Obj)
          this.postForm.reset();

        })
    }

  }

  onUpdate(){
    if(this.postForm.valid){
      let UPDATED_OBJ : Ipost = {
        ...this.postForm.value,
        id : this.EditId
      }

      this.postService.updatePost(UPDATED_OBJ)
      .subscribe({
        next : data => {
          console.log(data);
          this.postForm.reset();
          this.isinEditMode = false

          this.postService.setUpdateObj(data)
          
        },
        error : err => {
          console.log(err);
          
        }
      })
    }
  }



}
