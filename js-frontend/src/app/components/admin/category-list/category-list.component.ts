import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  categories = [
    { id: 1, name: 'Profile' },
    { id: 2, name: 'Hinges' },
    { id: 3, name: 'Glass' },
    { id: 4, name: 'Connector' },
  ];

  constructor(private router: Router) {}

  updateCategory(category: any) {
    this.router.navigateByUrl('admin/edit-category/' + category.id);
  }

  deleteCategory(category: any) {
    if (confirm('Delete brand: ' + category.name + '?')) {
      this.categories = this.categories.filter((c) => c !== category);
    }
  }

  openAddCategory() {
    this.router.navigateByUrl('admin/add-category');
  }
}
