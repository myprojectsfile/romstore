import { AuthGuard } from './auth.guard';
import { JwtHelper } from 'angular2-jwt';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MaterialModule } from './../shared/material.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [SigninComponent, SignupComponent],
  entryComponents: [SigninComponent, SignupComponent],
  exports: [SigninComponent, SignupComponent],
  providers: [AuthService, UserService,JwtHelper,AuthGuard]
})
export class AuthModule { }
