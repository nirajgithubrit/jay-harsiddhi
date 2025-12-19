import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialListComponent } from '../material-list/material-list.component';
import { BrandListComponent } from '../brand-list/brand-list.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ColorListComponent } from '../color-list/color-list.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialListComponent,
    BrandListComponent,
    CategoryListComponent,
    ColorListComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  tabs = ['Material Detail', 'Categories', 'Brands', 'Colors'];
  selectedTab = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.selectedTab = this.adminService.getTab() || 0;
  }

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
