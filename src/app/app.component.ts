import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CRUD OPERATIONS';
  selectedValue: string;

  options = [
    {value: 'form', viewValue: 'CREATE'},
    {value: 'view', viewValue: 'READ'},
    {value: 'update', viewValue: 'UPDATE'},
    {value: 'delete', viewValue: 'DELETE'}
  ];
  constructor(private router: Router) {}

  fuse() {
  //  alert('Inside Fuse');
   switch (this.selectedValue) {
     case 'form':
        this.router.navigate(['/form']); break;
      case 'view':
        this.router.navigate(['/view']); break;
      case 'update':
        this.router.navigate(['/update']); break;
      case 'delete':
        this.router.navigate(['/delete']); break;

    }
  }


}
