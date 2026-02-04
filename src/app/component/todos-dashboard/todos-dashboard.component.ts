import { Component, OnInit } from '@angular/core';
import { Itodos } from 'src/app/model/todo';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TodoServiceService } from 'src/app/service/todo-service.service';

@Component({
  selector: 'app-todos-dashboard',
  templateUrl: './todos-dashboard.component.html',
  styleUrls: ['./todos-dashboard.component.scss']
})
export class TodosDashboardComponent implements OnInit {

  todoArr: Array<Itodos> = []

  constructor(private _todoservice: TodoServiceService,
    private _snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.fetchAllTodos();
    this.AddTodoArr();
    this.onRemoveArr();
    this. UpdatedObjArr();

  }

  onRemoveArr() {
    this._todoservice.RemoveTodosubObj$
      .subscribe({
        next: data => {

          let getIndex = this.todoArr.findIndex(todo => todo.todoId === data);
          console.log(getIndex);
          if (getIndex > -1) {
            this.todoArr.splice(getIndex, 1);
            this._snackBar.snackBar(`The todo with id ${data} is removed successfully`)
          }

        },
        error: err => {
          console.log(err);

        }
      })
  }

  AddTodoArr() {
    this._todoservice.AddTodoDatasubObj$.subscribe({
      next: data => {
        console.log(data);

        this.todoArr.push(data)
        console.log(this.todoArr);
        this._snackBar.snackBar(`THe todo with id ${data.todoId} is Added successfully`)
       

      },
      error: err => {
        console.log(err);

      }
    })
  }

  fetchAllTodos() {
    this._todoservice.fetchAllTodos()
      .subscribe({
        next: data => {
          console.log(data);

          for (const key in data) {
            this.todoArr.push({ ...data[key], todoId: key })

            console.log(this.todoArr);

          }

        },
        error: err => {
          console.log(err);

        }
      })
  }

  UpdatedObjArr(){
    this._todoservice.UpdateObjSubObj$.subscribe({
      next : data => {
        console.log(data);

        let getIndex = this.todoArr.findIndex(todo => todo.todoId === data.todoId);
        this.todoArr[getIndex] = data;
        this._snackBar.snackBar(`The todo with id ${data.todoId} is updated successfully`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }



}


//  fetchAllpost() {
//     this.postservice.fetchAllData()
//       .subscribe({
//         next: data => {

//           for (const key in data) {

//             this.postArr.push({ ...data[key], id: key })
//           }

//         },
//         error: err => {
//           console.log(err);

//         }
//       })
//   }
