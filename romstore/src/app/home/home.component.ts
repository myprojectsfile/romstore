import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private authServie: AuthService) { }
    apiValues: string[] = [];

    signedIn: boolean = false;

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
    printClaims() {

    }
}
