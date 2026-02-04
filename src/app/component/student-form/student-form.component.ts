import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Istudent } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CustomRegex } from 'src/app/validators/pattern.validators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(private _studentService: StudentService) { }

  StudentForm !: FormGroup

  isInEditMode : boolean = false;

  EditId !: string

  ngOnInit(): void {
    this.formGroup();
    this.GetEditedObj()
  }

  GetEditedObj(){
    this._studentService.EditStdSubObs$.subscribe({
      next : data => {
        console.log(data);
        this.StudentForm.patchValue(data);
        this.isInEditMode = true;
        this.EditId = data.stdId;
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  formGroup() {
    this.StudentForm = new FormGroup({
      fname: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.username)], []),
      lname: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.username)], []),
      email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], []),
      contact: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.mobileNum)], [])
    })
  }

 get formcontrols(){
   return this.StudentForm.controls
  }

  newStudentAdd() {
    if (this.StudentForm.valid) {
      let StuObj: Istudent = {
        ...this.StudentForm.value
      }
      this._studentService.creatNewObj(StuObj)
        .subscribe({
          next: data => {
            this._studentService.sendData$({...StuObj, stdId : data.name})
            this.StudentForm.reset();
           
          },
          error: err => {
            console.log(err);

          }
        })
    }
  }

  onUpdateStd(){
   if(this.StudentForm.valid){
    let UPDATE_OBj : Istudent = {
      ...this.StudentForm.value,
      stdId : this.EditId
    }

    this._studentService.updateStd(UPDATE_OBj).subscribe({
      next : data => {
        console.log(data);
        this._studentService.SendUpdateObj(data);
        this.StudentForm.reset();
         this.isInEditMode = false;
      },
      error : err => {
        console.log(err);
        
      }
    })
   }
  }

 

}
