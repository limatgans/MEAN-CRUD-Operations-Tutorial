import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee(firstname, lastname, mobile, email, dob, doj) {
    const uri = 'http://localhost:3003/form';
    const obj = {
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      email: email,
      dob: dob,
      doj: doj

    };
    this.http.post(uri, obj)
        .subscribe(res => {
          alert('Insert Operation Performed');
        } , err => {
          alert('Insert Operation Failed');
        } );
  }

  getEmployees(): Observable<any> {
    const uri = 'http://localhost:3003/view';
    return this
            .http
            .get(uri)
            .map(res => {
              return res;
            });
  }

  validateEmail(email): Observable<any> {
    const uri = 'http://localhost:3003/findemail';
    const obj = {

      email: email

    };
    return this
            .http
            .post(uri, obj)
            .map(res => {
              console.dir('Inside validateEmail- RESPONSE : \n' + res);
              return res;
            });
  }

  updateEmployees(firstname, lastname, mobile, email, dob, doj) {
    const uri = 'http://localhost:3003/update';
    const obj = {
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      email: email,
      dob: dob,
      doj: doj

    };

    this.http.post(uri, obj)
        .subscribe(res => {
          console.log('UPDATE Operation Performed');
        } , err => {
          console.log('UPDATE Operation Failed');
        } );
  }

  deleteEmployees(email) {
    const uri = 'http://localhost:3003/delete';
    const obj = {
      email: email,
    };

    this.http.post(uri, obj)
        .subscribe(res => {
          console.log('DELETE Operation Performed');
        } , err => {
          console.log('DELETE Operation Failed');
        } );
  }

}
