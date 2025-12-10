import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categories: any = [];

  constructor(private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllItem('category').subscribe((res) => {
      this.categories = res
    })
  }

  updateCategory(category: any) {
    this.router.navigateByUrl('admin/edit-category/' + category._id);
  }

  deleteCategory(category: any) {
    if (confirm('Delete brand: ' + category.name + '?')) {
      this.adminService.deleteItem('category', category._id).subscribe((res) => {
        this.categories = this.categories.filter((c: any) => c !== category);
      })
    }
  }

  openAddCategory() {
    this.router.navigateByUrl('admin/add-category');
  }
}
