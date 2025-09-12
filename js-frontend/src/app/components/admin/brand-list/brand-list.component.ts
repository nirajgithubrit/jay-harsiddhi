import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss',
})
export class BrandListComponent {
  brands = [
    { id: 1, name: 'Blandox' },
    { id: 2, name: 'Bajarang' },
    { id: 3, name: 'Hettich' },
    { id: 4, name: 'Sain-Globin' },
  ];

  constructor(private router: Router) {}

  updateBrand(brand: any) {
    // Add your update logic or modal here
    this.router.navigateByUrl('admin/edit-brand/' + brand.id);
  }

  deleteBrand(brand: any) {
    // Add your delete logic here
    if (confirm('Delete brand: ' + brand.name + '?')) {
      this.brands = this.brands.filter((b) => b !== brand);
    }
  }

  openAddBrand() {
    this.router.navigateByUrl('admin/add-brand');
  }
}
