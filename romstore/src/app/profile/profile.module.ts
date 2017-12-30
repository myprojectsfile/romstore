import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [GeneralInfoComponent, ProfilePhotoComponent, ProfileComponent]
})
export class ProfileModule { }
