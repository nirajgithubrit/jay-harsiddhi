import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Material } from '../../../model/material';
import { Router } from '@angular/router';
import MaterialList from '../../../../assets/materials.json';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
})
export class MaterialListComponent {
  materials: Material[] = MaterialList;

  constructor(private router: Router) {}

  openAddMaterial() {
    this.router.navigateByUrl('admin/add-material');
  }

  editMaterial(material: any) {
    this.router.navigateByUrl('admin/edit-material/' + material.id);
  }

  deleteMaterial(id: number) {}
}
