import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptContainersComponent } from './receipt-containers/receipt-containers.component';
import { RmtoApiService } from './rmto-api.service';
import { RmtoRoutingModule } from './/rmto-routing.module';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RmtoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [ReceiptContainersComponent],
  providers: [RmtoApiService]
})
export class RmtoModule { }
