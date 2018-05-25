import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

import { FormComponent } from '../form/form.component';
import { ViewComponent } from '../view/view.component';

import { EmployeeService } from '../employee.service';
import { Http } from '@angular/http';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public  firstname: string;
  public  lastname: string;
  public  mobile: string;
  public  email: string;
  public  doB: Date;
  public  doJ: Date;
  public validateEmailFlag = false;


  minDate = new Date(1950, 0, 1);
  maxDate = new Date(Date.now());
  minJoinDate = new Date(1950, 0, 1);
  maxJoinDate = new Date(Date.now());

  // data;
  // dobStr = this.doB.toString();
  // dojStr = this.doJ.toString();




  firstnameFormControl = new FormControl('', [Validators.required,
                                              Validators.pattern(/^[A-Z]+$/i),
                                              Validators.min(3)] );
  lastnameFormControl = new FormControl('', [Validators.required,
                                              Validators.pattern(/^[A-Z]+$/i),
                                              Validators.min(3)]);
  mobileFormControl = new FormControl('', [Validators.required,
                                            Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]);
  emailFormControl = new FormControl('', [Validators.required,
                                          Validators.email]);
  dobFormControl = new FormControl('', [Validators.required] );
  dojFormControl = new FormControl('', [Validators.required] );

  constructor(private http: Http, private employeeservice: EmployeeService) {
    // this.http.get('assets/data/data.json')
    // .subscribe(res => this.data = res.json());
    // console.log('Inside Tab:' + this.data);


    }

  ngOnInit() {
  }

  getFirstNameErrorMessage() {
    return this.firstnameFormControl.hasError('required') ? 'You must enter a value' :
        (this.firstnameFormControl.hasError('pattern') )  ? 'Not a valid Name' : '';
  }
  getLastNameErrorMessage() {
    return this.lastnameFormControl.hasError('required') ? 'You must enter a value' :
        (this.lastnameFormControl.hasError('pattern'))  ? 'Not a valid Name' : '';
  }
  getMobileErrorMessage() {
    return this.mobileFormControl.hasError('required') ? 'You must enter a value' :
        (this.mobileFormControl.hasError('pattern') )  ? 'Not a valid Mobile Number' : '';
  }

  getEmailErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  getDoBErrorMessage() {
    return this.dobFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getDoJErrorMessage() {
    return this.dobFormControl.hasError('required') ? 'You must enter a value' : '';
  }


  refresh() {
    this.firstname = '';
    this.lastname = '';
    this.mobile = '';
    this.email = '';
    this.doB = null;
    this.doJ = null;
  }

  getMonthName(month) {
    let monthname: string;
    switch (month) {
      case 1 :
        monthname = 'January';
        break;
      case 2 :
        monthname = 'February';
        break;
      case 3 :
        monthname = 'March';
        break;
      case 4 :
        monthname = 'April';
        break;
      case 5 :
        monthname = 'May';
        break;
      case 6 :
        monthname = 'June';
        break;
      case 7 :
        monthname = 'July';
        break;
      case 8 :
        monthname = 'August';
        break;
      case 9 :
        monthname = 'September';
        break;
      case 10 :
        monthname = 'October';
        break;
      case 11 :
        monthname = 'November';
        break;
      case 12 :
        monthname = 'December';
        break;
    }
  }

  date_validate(dateObject: Date) {

    let flag: number;
    flag = 1;

    // const day: number = dateObject.getDate();
    // const month: number = dateObject.getMonth();
    // const year: number = dateObject.getFullYear();
    // alert('Inside Date_Validate' + day);

    const date = dateObject.toLocaleDateString();
    const dateSplit = date.split('/');
    const month: number = Number.parseInt(dateSplit[0]);
    const day: number = Number.parseInt(dateSplit[1]);
    const year: number = Number.parseInt(dateSplit[2]);

    // alert('Date' + date + 'Day ' + day + ' Month' + month + ' Year ' + year);

    if (isNaN(day) || isNaN(month) || isNaN(year) ||
        day === 0 || month === 0 || year === 0) {
        alert('Invalid Date - Click The Calendar Icon to Select Date');
        flag = 0;
    } else {
            // Checking the months
            if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
                alert('No of Days in ' + this.getMonthName(month) + 'should be atmost 30');
                flag = 0;
            }

            if ((month === 1 || month === 3 || month === 5 ||
                  month === 7 || month === 8 || month === 10 ||
                  month === 12) && day > 31) {
                alert('No of Days in ' + this.getMonthName(month) + 'should be atmost 31' );
                flag = 0;
            }

            // Checking For Leap Year or not
            if (month === 2) {
                let leapyear = false;

                if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                  leapyear = true;
                }

                if ((leapyear) && day > 29) {
                  alert('No of Days in ' + this.getMonthName(month) + 'should be atmost 29' );
                  flag = 0;
                }

                if (!(leapyear) && day > 28) {
                  alert('No of Days in ' + this.getMonthName(month) + 'should be atmost 28' );
                  flag = 0;
                }


            }

            if (month > 12) {
                    alert('Please enter Month less than equal to 12');
                    flag = 0;
            }

            // >>number.toLocaleString()
            // >>"1,994"

            if (year.toLocaleString().length !== 5) {
                    alert('Please enter Year in Four Digit (yyyy)');
                    flag = 0;
            }

      }


    if (flag === 0) {
      return false;
    } else {
        return true;
    }
}

  compare_dates(dateofBirthObject: Date, dateofJoinObject: Date) {


    let flag = 1;

    if (this.date_validate(dateofBirthObject) && this.date_validate(dateofJoinObject)) {


      const dateofBirth: string = dateofBirthObject.toDateString();
      const dateofJoin: string = dateofJoinObject.toDateString();

      const now = new Date();
      // alert("Now " + now);

      const twentytwoyearsago = new Date();
      twentytwoyearsago.setFullYear( now.getFullYear() - 22 );
      // alert("twentytwoyearsago " + twentytwoyearsago);
      const birthDate = new Date(dateofBirth);
      const joinDate = new Date(dateofJoin);

      if (birthDate.getTime() > twentytwoyearsago.getTime() ) {
          flag = 0;
          alert('Birth Date should be atleast 22 years old');
      }

      if (birthDate.getTime() >= joinDate.getTime()) {
          flag = 0;
          alert('Date of Birth should be less than Date of Join');
      }

    }

    if (flag === 0) {
      return false;
    } else {
      return true;
    }
  }

  validate() {

    const compare_dates: boolean = this.compare_dates(this.doB, this.doJ);
    const isEmpty = x => (x === '' || x === undefined);

    if (([ this.firstname, this.lastname, this.mobile, this.email ].find(isEmpty)) ||
        this.doB.toLocaleDateString() === '' || this.doB === undefined ||
        this.doJ.toLocaleDateString() === '' || this.doJ === undefined) {

        alert('Please fill all the details');
        if (this.doB !== undefined && this.doJ !== undefined) {
          if (!compare_dates) {
            return true;
          }
        }
        this.refresh();
        return false;

        } else {
        return true;
        }


  }

  updateEmployee() {
    this.employeeservice.updateEmployees(this.firstname,
      this.lastname,
      this.mobile,
      this.email,
      this.doB.toLocaleDateString(),
      this.doJ.toLocaleDateString() );

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
                            if (!this.validateEmailFlag) {
                              this.validateEmailFlag = true;
                            } else {
                              this.updateEmployee();
                            }

                          }
                        );
    // alert('Value of FLAG Outside Subscribe - FormComponent is \n' + flag);
  }


  updatevalues() {
    let validate = true;
    validate = this.validate();

    if (validate === true) {
      alert('The Obtained Values are' +
            '\n First Name: ' +  this.firstname +
            '\n Last Name: '  + this.lastname +
            '\n Mobile: ' + this.mobile +
            '\n Email: ' + this.email +
            '\n DoB: ' + this.doB +
            '\n DoJ: ' + this.doJ
          );

      this.validateEmail();
      // this.addEmployee();


    } else {
      alert('Enter Values');
    }


  }




}
