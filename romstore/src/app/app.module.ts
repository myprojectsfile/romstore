import { ProfileModule } from './profile/profile.module';
import { MaterialModule } from './shared/material.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RmtoModule } from './rmto/rmto.module';
import { HttpClientModule } from '@angular/common/http'
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AuthModule,
        MaterialModule,
        AppRoutingModule,
        ProfileModule,
        FlexLayoutModule,
        RmtoModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
