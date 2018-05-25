// ./angular-client/src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';


export const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
 // { path: 'home', component: AppComponent },
  { path: 'form', component: FormComponent },
  { path: 'view', component: ViewComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'delete', component: DeleteComponent }
];

export class AppRoutingModule {}
