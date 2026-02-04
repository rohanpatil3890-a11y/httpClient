import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDashboardComponent } from './component/post-dashboard/post-dashboard.component';
import { PostCardComponent } from './component/post-card/post-card.component';
import { PostFormComponent } from './component/post-form/post-form.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GetconformComponent } from './component/getconform/getconform.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { TodosComponent } from './component/todos/todos.component';
import { TodosDashboardComponent } from './component/todos-dashboard/todos-dashboard.component';
import { TodosListComponent } from './component/todos-list/todos-list.component';
import { ApiInterseptorInterceptor } from './service/api-interseptor.interceptor';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { StudentFormComponent } from './component/student-form/student-form.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { ImageDashboardComponent } from './component/image-dashboard/image-dashboard.component';
import { ImageListComponent } from './component/image-list/image-list.component';
import { ImageFormComponent } from './component/image-form/image-form.component';
// import {MatProgressSpinner} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    PostDashboardComponent,
    PostCardComponent,
    PostFormComponent,
    GetconformComponent,
    TodosComponent,
    TodosDashboardComponent,
    TodosListComponent,
    StudentDashboardComponent,
    StudentFormComponent,
    StudentListComponent,
    ImageDashboardComponent,
    ImageListComponent,
    ImageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterseptorInterceptor,
      multi : true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
