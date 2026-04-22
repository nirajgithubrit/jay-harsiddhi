import { Routes } from '@angular/router';

import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AccountPendingComponent } from './components/authentication/account-pending/account-pending.component';

import { AllCustomer } from './components/customer/all-customer/all-customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { ViewCustomerComponent } from './components/customer/view-customer/view-customer.component';
import { ViewInvoiceComponent } from './components/customer/view-invoice/view-invoice.component';

import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AddMaterialComponent } from './components/admin/add-material/add-material.component';
import { AddBrandComponent } from './components/admin/add-brand/add-brand.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddColorComponent } from './components/admin/add-color/add-color.component';

import { authGuard } from './core/auth-guard.guard';

export const routes: Routes = [

  // 🔓 Public Routes
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account-pending',
    component: AccountPendingComponent
  },

  // 🔐 Protected Routes
  {
    path: '',
    canActivate: [authGuard],
    children: [

      // 🏠 Dashboard
      {
        path: '',
        component: AllCustomer
      },

      // 👤 Customer
      {
        path: 'customer',
        children: [
          { path: 'add', component: AddCustomerComponent },
          { path: 'view/:id', component: ViewCustomerComponent },
          { path: 'invoice/:id', component: ViewInvoiceComponent }
        ]
      },

      // 🛠 Admin (grouped)
      {
        path: 'admin',
        children: [
          { path: '', redirectTo: 'admin', pathMatch: 'full' },
          { path: '', component: AdminPageComponent },

          // Material
          { path: 'material/add', component: AddMaterialComponent },
          { path: 'material/edit/:id', component: AddMaterialComponent },

          // Brand
          { path: 'brand/add', component: AddBrandComponent },
          { path: 'brand/edit/:id', component: AddBrandComponent },

          // Category
          { path: 'category/add', component: AddCategoryComponent },
          { path: 'category/edit/:id', component: AddCategoryComponent },

          // Color
          { path: 'color/add', component: AddColorComponent },
          { path: 'color/edit/:id', component: AddColorComponent }
        ]
      }
    ]
  },

  // ❌ Fallback Route
  {
    path: '**',
    redirectTo: ''
  }
];