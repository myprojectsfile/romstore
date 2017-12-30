import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { RmtoApiService } from '../rmto-api.service';
import { Container } from '../container';
import { MatTableDataSource, MatPaginator, MatSpinner } from '@angular/material';

@Component({
  selector: 'app-receipt-containers',
  templateUrl: './receipt-containers.component.html',
  styleUrls: ['./receipt-containers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReceiptContainersComponent {
  dataSource: MatTableDataSource<Container>;

  constructor(private rmtoApi: RmtoApiService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  showSpinner = false;
  receiptNumber: string = null;
  containers: Container[] = [];
  displayedColumns = ['shomarehContainer', 'isoContainerCode', 'vaznNakhales', 'porYaKhali', 'vaznContainer', 'khatKeshtirani', 'namayandegiKeshtirani'];
  error: string = null;


  callApi() {

    this.showSpinner = true;

    this.rmtoApi.getReceiptContainers(this.receiptNumber)
      .subscribe(
      data => {
        this.error = null;
        this.containers = data;
        this.dataSource = new MatTableDataSource<Container>(this.containers);
        this.dataSource.paginator = this.paginator;
        this.showSpinner = false;
      },
      error => {
        this.containers = [];
        this.error = error.error;
        this.showSpinner = false;
      }
      );
  }
}

