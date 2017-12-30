import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptContainersComponent } from './receipt-containers/receipt-containers.component';
import { AuthGuard } from '../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'receiptContainer', component: ReceiptContainersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RmtoRoutingModule { }
