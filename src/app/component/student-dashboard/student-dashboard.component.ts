import { Component, OnInit } from '@angular/core';
import { Istudent } from 'src/app/model/student';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private _studentService: StudentService,
    private _SnackBar: SnackbarService
  ) { }

  StudentArr: Array<Istudent> = [];

  ngOnInit(): void {

    this.fetchAllStudentsdata();
    this.AddStudentArr();
    this.removeStdArr();
    this.UpdateObjInArr();
  }

  removeStdArr() {
    this._studentService.RemoveStdSubObj$.subscribe({
      next: data => {
        console.log(data);
        let getIndex = this.StudentArr.findIndex(p => p.stdId === data);
        this.StudentArr.splice(getIndex, 1)
         this._SnackBar.snackBar(`The Student with id ${data} is removed successfully`)
      },
      error: err => {
        console.log(err);

      }
    })
  }

  fetchAllStudentsdata() {
    this._studentService.fetchAllStd()
      .subscribe({
        next: data => {
          this.StudentArr = data


        },
        error: err => {
          console.log(err);

        }
      })
  }

  AddStudentArr() {
    this._studentService.newStudentSubObs$.subscribe({
      next: data => {

        this.StudentArr.push(data)
        console.log(this.StudentArr);
        this._SnackBar.snackBar(`The student with id ${data.stdId} is creted successfully`)

      },
      error: err => {
        console.log(err);

      }
    })
  }

  UpdateObjInArr() {
    this._studentService.UpdateStdSubObs$.subscribe({
      next : data => {
        let getIndex = this.StudentArr.findIndex(std => std.stdId === data.stdId);
        this.StudentArr[getIndex] = data;
        this._SnackBar.snackBar(`The student With id ${data.stdId} is updated successfully`)
      },
      error: err => {
        console.log(err);

      }
    })
  }

}
