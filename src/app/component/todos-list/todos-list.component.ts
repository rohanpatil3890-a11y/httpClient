import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Itodos } from 'src/app/model/todo';
import { TodoServiceService } from 'src/app/service/todo-service.service';
import { GetconformComponent } from '../getconform/getconform.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  constructor(private todoService : TodoServiceService,
    private _matDiloge : MatDialog
  ) { }

  @Input() todoArr !: Array<Itodos>

  ngOnInit(): void {
  }

  trackById(index : number, todo : Itodos){
   return todo.todoId
  }

  onRemove(todoId: string) {

    let config = new MatDialogConfig();
    config.disableClose = true;
    config.data = `Are you sure, you want to remove todo with id ${todoId}`;
    
    let _matRef = this._matDiloge.open(GetconformComponent,config);
    _matRef.afterClosed()
    .pipe(
      filter(flag => flag == true),
      switchMap(() => {
        return this.todoService.removeTodo(todoId)
      
      })
    )
    .subscribe({
          next : data => {
            this.todoService.sendRemoveId$(todoId)
            
          },
          error : err => {
            console.log(err);
            
          }
        })
    

}

onEdit(todo : Itodos){
  this.todoService.EditObjSend$(todo);
}

}
