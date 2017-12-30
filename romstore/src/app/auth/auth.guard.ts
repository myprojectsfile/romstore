import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as RouteClaims from './route.claims';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let nextRouteUrl = state.url;
    let routeClaims = this.getRouteClaims(nextRouteUrl);
    let routeCanActivate = true;

    // show signIn dialog if user must sign in
    if (this.signInRequired(nextRouteUrl) && !this.authService.isSignedIn()) {
      this.snackBar.open('ابتدا باید با نام کاربری خود وارد شوید', 'خطا', { duration: 2000 });      
      this.authService.signIn().subscribe(result => {
        if (result) {
          for (let claim of routeClaims) {
            routeCanActivate = routeCanActivate && this.authService.userHasClaim(claim);
          }
          if (!routeCanActivate) {
            this.snackBar.open('شما مجوز دسترسی به این بخش را ندارید', 'خطا', { duration: 2000 });
          }
          if (routeCanActivate) this.router.navigate([nextRouteUrl]);
          return routeCanActivate;
        } else {
          return false;
        }
      });
    }
    else {
      for (let claim of routeClaims) {
        routeCanActivate = routeCanActivate && this.authService.userHasClaim(claim);
      }
      if (!routeCanActivate) {
        this.snackBar.open('شما مجوز دسترسی به این بخش را ندارید', 'خطا', { duration: 2000 });
      }
      return routeCanActivate;
    };
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let nextRouteUrl = state.url;
    let routeClaims = this.getRouteClaims(nextRouteUrl);
    let routeCanActivate = true;

    // show signIn dialog if user must sign in
    if (this.signInRequired(nextRouteUrl) && !this.authService.isSignedIn()) {
      this.snackBar.open('ابتدا باید با نام کاربری خود وارد شوید', 'خطا', { duration: 2000 });
      this.authService.signIn().subscribe(result => {
        if (result) {
          for (let claim of routeClaims) {
            routeCanActivate = routeCanActivate && this.authService.userHasClaim(claim);
          }
          if (!routeCanActivate) {
            this.snackBar.open('شما مجوز دسترسی به این بخش را ندارید', 'خطا', { duration: 2000 });
          }
          if (routeCanActivate) this.router.navigate([nextRouteUrl]);
          return routeCanActivate;
        }
        else return false;
      });
    }
    else {
      for (let claim of routeClaims) {
        routeCanActivate = routeCanActivate && this.authService.userHasClaim(claim);
      }
      if (!routeCanActivate) {
        this.snackBar.open('شما مجوز دسترسی به این بخش را ندارید', 'خطا', { duration: 2000 });
      }
      return routeCanActivate;
    };
  }


  getRouteClaims(routeUrl: string) {
    let route = RouteClaims.default.Routes.find(r => r.routeUrl === routeUrl);
    let claims = route.claims;
    return claims;
  }

  signInRequired(routeUrl: string): boolean {
    let route = RouteClaims.default.Routes.find(r => r.routeUrl === routeUrl);
    if (route) return (route.signInRequired === 'true');
    else return false;
  }
}
