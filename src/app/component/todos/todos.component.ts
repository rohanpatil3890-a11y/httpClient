import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Itodos } from 'src/app/model/todo';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  isInEditMode : boolean = false;

  EditId !: string



  constructor(private _todoService : TodoServiceService) { }

  ngOnInit(): void {

    this.formControl()

    this._todoService.EditObjSubObs$.subscribe({
      next : data => {
        console.log(data);
        this.todoForm.patchValue(data);
        this.isInEditMode = true;
        this.EditId = data.todoId
        
      },error : err => {
        console.log(err);
        
      }
    })

  }

  

  todoForm !: FormGroup


  formControl(){
    this.todoForm = new FormGroup({

      todoName : new FormControl(null,[Validators.required],[])
    
  })
  }

  get formTodoFormControls(){
    return this.todoForm.controls
  }

   OnAddTodo(){
   if( this.todoForm.valid){
    let todoObj : Itodos = {
      ...this.todoForm.value
    }
    this._todoService.AddTodo(todoObj)
    .subscribe({
      next : data => {
        todoObj.todoId = data.name
        this.todoForm.reset();
        this._todoService.sendData(todoObj)
       
        
        
      },
      error : err => {
        console.log(err);
        
      }
    })
   }
   }

   onUpdate(){
    if(this.todoForm.valid){
      let UPDATE_OBJ : Itodos = {
        ...this.todoForm.value,
        todoId : this.EditId
      }
      this._todoService.updateTodo(UPDATE_OBJ)
      .subscribe({
        next : data => {
          this.todoForm.reset();
          this.isInEditMode = false;
           this._todoService.UpdatedObj$(data);
        },
        error : err => {
          console.log(err);
          
        }
      })
    }
   }
  

}
