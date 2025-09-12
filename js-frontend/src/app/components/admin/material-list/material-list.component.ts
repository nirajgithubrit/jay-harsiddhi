import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Material } from '../../../types/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
})
export class MaterialListComponent {
  materials: Material[] = [
    {
      id: 1,
      name: '3mm Edge Gola Patti',
      category: 'Profile',
      finish: 'Black',
      brand: 'Blandox',
      price: 1350,
      image: 'https://via.placeholder.com/150?text=Wooden+Oak',
    },
    {
      id: 2,
      name: '3mm Edge Gola Handal',
      category: 'Profile',
      finish: 'Black',
      brand: 'Blandox',
      price: 1600,
      image: 'https://via.placeholder.com/150?text=Steel+Grey',
    },
    {
      id: 3,
      name: '8mm Edge 20mm patti',
      category: 'Profile',
      finish: 'Matt Gray',
      brand: 'Blandox',
      price: 1300,
      image: 'https://via.placeholder.com/150?text=Steel+Grey',
    },
    {
      id: 4,
      name: '8mm Edge 20mm Handal',
      category: 'Profile',
      finish: 'Matt Gray',
      brand: 'Blandox',
      price: 1600,
      image: 'https://via.placeholder.com/150?text=Steel+Grey',
    },
    {
      id: 5,
      name: 'Regular Profile',
      category: 'Connector',
      finish: 'Steel',
      brand: 'Bajarang',
      price: 80,
      image: 'https://glassco.co.in/wp-content/uploads/2023/04/GSPA-04.jpg',
    },
    {
      id: 6,
      name: '3D Softclose',
      category: 'Hinges',
      finish: 'Steel',
      brand: 'Blandox',
      price: 250,
      image:
        'https://m.media-amazon.com/images/I/71Wo1MyuoJL._UF350,350_QL50_.jpg',
    },
    {
      id: 7,
      name: '4mm Smoke',
      category: 'Glass',
      finish: 'Black',
      brand: 'Saint-Globin',
      price: 78,
      image:
        'https://5.imimg.com/data5/SELLER/Default/2023/9/345899483/SX/IS/YU/61894372/tinted-glass.jpg',
    },
  ];

  constructor(private router: Router) {}

  openAddMaterial() {
    this.router.navigateByUrl('admin/add-material');
  }

  editMaterial(material: any) {
    this.router.navigateByUrl('admin/edit-material/' + material.id);
  }

  deleteMaterial(id: number) {}
}
