import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Istudent } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { GetconformComponent } from '../getconform/getconform.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

@Input() StudentArr !: Array<Istudent>

  constructor(private _studentService : StudentService,
    private _MatDilog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  trackById(index : number, std : Istudent){
    return std.stdId
  }


  RemoveStd(id : string){
   let config = new MatDialogConfig();
   config.disableClose = true;
   config.data = `Are you sure you want to remove student with id ${id}`;

   let MatDilogRef = this._MatDilog.open(GetconformComponent,config);
   MatDilogRef.afterClosed().pipe(
    filter(flag => flag == true),
    switchMap(() => {
      return this._studentService.removeStd(id)
    })
   )
   .subscribe({
    next : data =>{
      console.log(data);
      this._studentService.sendRemoveStd(id)
      
    },
    error : err =>{
      console.log(err);
      
    }
   })
  }

  onEdit(std : Istudent){
    this._studentService.SendEditObj(std)
  }

}
