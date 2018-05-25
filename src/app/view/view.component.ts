import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../employee.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  arrEmp: any[];
  employees: Observable<Array<any>>;
  displayedColumns = ['First Name', 'Last Name', 'Mobile Number', 'Email ID', 'Date Of Birth', 'Date of Join'];


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: HttpClient, private service: EmployeeService) { }

  getEmployees() {
    this.service.getEmployees().subscribe(res => {
      console.dir(res);
      this.employees = res;

      console.log('GOT THE EMPLOYEES');

      // console.log('Inside GET EMPLOYEES');
      // console.dir(this.employees);

      // this.dataSource = new MatTableDataSource(this.employees);
      // this.dataSource.paginator = this.paginator;
      // return res;
    });
  }

  ngOnInit() {
    // console.log('Inside ngOnInit');
    this.getEmployees();
    // this.employees = this.getEmployees();
    // console.log('Outside getEmployees');
    // console.dir(this.employees);
    // this.dataSource = new MatTableDataSource(this.employees);
    // this.dataSource.paginator = this.paginator;
  }


}
