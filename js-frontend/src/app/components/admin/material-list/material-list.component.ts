import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Material } from '../../../model/material';
import { Router } from '@angular/router';
import MaterialList from '../../../../assets/materials.json';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
})
export class MaterialListComponent implements OnInit {
  materials: any = [];
  categories: any = []
  brands: any = []
  finishes: any = []

  constructor(private router: Router,
    private adminService: AdminService
  ) { }

  async ngOnInit() {

    this.categories = await this.getItems('category')
    this.brands = await this.getItems('brand')
    this.finishes = await this.getItems('color')

    this.adminService.getAllItem('material').subscribe((res) => {
      this.materials = res
    })
  }

  openAddMaterial() {
    this.router.navigateByUrl('admin/add-material');
  }

  editMaterial(material: any) {
    this.router.navigateByUrl('admin/edit-material/' + material._id);
  }

  deleteMaterial(id: number) { }

  async getItems(routeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.getAllItem(routeName).subscribe((res) => {
        resolve(res)
      })
    })
  }

  getFinishNamebyId(id: string) {
    return this.finishes.find((f: any) => f._id == id).name
  }

  getCategoryNameById(id: string) {
    return this.categories.find((c: any) => c._id == id).name
  }

  getBrandNameById(id: string) {
    return this.brands.find((b: any) => b._id == id).name
  }
}
