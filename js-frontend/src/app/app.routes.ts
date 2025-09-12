import { Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AllCustomer } from './components/customer/all-customer/all-customer.component';
import { authGuard } from './core/auth-guard.guard';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AddMaterialComponent } from './components/admin/add-material/add-material.component';
import { AddBrandComponent } from './components/admin/add-brand/add-brand.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddColorComponent } from './components/admin/add-color/add-color.component';

export const routes: Routes = [
  {
    path: '',
    component: AllCustomer,
    // canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'admin/add-material',
    component: AddMaterialComponent,
  },
  {
    path: 'admin/edit-material/:id',
    component: AddMaterialComponent,
  },
  {
    path: 'admin/add-brand',
    component: AddBrandComponent,
  },
  {
    path: 'admin/edit-brand/:id',
    component: AddBrandComponent,
  },
  {
    path: 'admin/add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'admin/edit-category/:id',
    component: AddCategoryComponent,
  },
  {
    path: 'admin/add-color',
    component: AddColorComponent,
  },
  {
    path: 'admin/edit-color/:id',
    component: AddColorComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
