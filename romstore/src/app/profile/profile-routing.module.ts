import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './profile.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', component: GeneralInfoComponent },
      { path: 'profilePhoto', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
