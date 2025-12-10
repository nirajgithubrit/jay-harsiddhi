import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss',
})
export class BrandListComponent implements OnInit {
  brands: any = [];

  constructor(private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllItem('brand').subscribe((res) => {
      this.brands = res
    })
  }

  updateBrand(brand: any) {
    this.router.navigateByUrl('admin/edit-brand/' + brand._id);
  }

  deleteBrand(brand: any) {
    if (confirm('Delete brand: ' + brand.name + '?')) {
      this.adminService.deleteItem('brand', brand._id).subscribe((res) => {
        this.brands = this.brands.filter((b: any) => b !== brand);
      })
    }
  }

  openAddBrand() {
    this.router.navigateByUrl('admin/add-brand');
  }
}
