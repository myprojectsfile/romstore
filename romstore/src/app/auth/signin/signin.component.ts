import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private userService: UserService, public dialogRef: MatDialogRef<SigninComponent>) {
  }

  username = '';
  password = '';

  signIn() {
    this.userService.signIn(this.username, this.password)
      .subscribe(res => {
        if (res.ok && res.status === 200) {
          // if signIn succeeded:
          // write token to localstorage
          localStorage.setItem('token', res.text());
          this.dialogRef.close(true);
        } else if (!res.ok && res.status === 401) {
          console.log('user or password is not correct');
        } else {
          console.log('failed in login operation.');
        }
      }, error => {
        console.log('user or password is not correct');
      });
  }
}
