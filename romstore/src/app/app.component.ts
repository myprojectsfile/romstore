import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private authServie: AuthService) {
        
    }

    signIn() {
        this.authServie.signIn();
    }
    signUp() {
        this.authServie.signUp();
    }

    isSignedIn() {
        return this.authServie.isSignedIn();
    }
    signOut() {
        return this.authServie.signOut();
    }
}
