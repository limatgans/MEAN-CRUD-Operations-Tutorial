import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { FormComponent } from '../form/form.component';
import { ViewComponent } from '../view/view.component';
import { UpdateComponent } from '../update/update.component';

import { EmployeeService } from '../employee.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {


  public email: string;
  emailFormControl = new FormControl('', [Validators.required,
                                          Validators.email]);

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private http: Http, private employeeservice: EmployeeService) { }

  ngOnInit() {
  }

  // getEmailErrorMessage() {
  //   return this.emailFormControl.hasError('required') ? 'You must enter a value' :
  //       this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  // }

  refresh() {
    this.email = '';
  }

  deleteEmployee() {
    this.employeeservice.deleteEmployees(this.email);

  }

  validateEmail() {
    let flag: boolean;
    this.employeeservice.validateEmail(this.email)
                        .subscribe(val => {
                            flag = val;
                            // alert('Value of FLAG inside ValidateEmail - FormComponent is \n' + flag);
                            if (!flag) {
                              alert('Email is not in the DB, enter registered email address');
                              this.refresh();
                              return;
                            }
                            this.deleteEmployee();

                          }
                        );
    // alert('Value of FLAG Outside Subscribe - FormComponent is \n' + flag);
  }


}
