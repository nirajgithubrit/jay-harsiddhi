import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { Material } from '../../../types/material';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-material',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AdminHeaderComponent],
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.scss',
})
export class AddMaterialComponent implements OnInit {
  materialForm: FormGroup;
  isEditMode: boolean = false;

  categories: string[] = ['Profile', 'Hinges', 'Glass', 'Connector'];
  brands: string[] = ['Blandox', 'Bajarang', 'Hettich', 'Sain-Globin'];
  finishes: string[] = [
    'Black',
    'Glossy Gray',
    'Matt Gray',
    'Rose Gold',
    'Golden',
    'Aluminium',
    'Steel',
  ];
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      finish: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
      imageName: [''],
    });
  }
  ngOnInit(): void {
    const materialId = parseInt(this.activatedRoute.snapshot.params['id']);
    if (materialId) {
      this.isEditMode = true;
      const material = this.getMaterial(materialId);
      this.materialForm.get('name')?.patchValue(material?.name);
      this.materialForm.get('category')?.patchValue(material?.category);
      this.materialForm.get('brand')?.patchValue(material?.brand);
      this.materialForm.get('finish')?.patchValue(material?.finish);
      this.materialForm.get('price')?.patchValue(material?.price);
      this.materialForm.get('image')?.patchValue(material?.image);
    }
  }

  save() {
    this.adminService.setTab(0);
    this.router.navigateByUrl('/admin');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.materialForm.get('imageName')?.patchValue(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.materialForm.get('image')?.patchValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.materialForm.get('imageName')?.patchValue('');
    this.materialForm.get('image')?.patchValue('');
    // Clear the file input if needed (add a template reference #fileInput and reset it)
    (document.getElementById('image-upload') as HTMLInputElement).value = '';
  }

  close() {}

  private getMaterial(id: number) {
    return this.materials.find((x: Material) => x.id == id);
  }
}
