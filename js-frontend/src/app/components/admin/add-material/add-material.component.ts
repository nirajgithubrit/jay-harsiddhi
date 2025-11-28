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
import { Material } from '../../../model/material';
import { AdminService } from '../../../services/admin.service';
import MaterialList from '../../../../assets/materials.json';

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
  materials: Material[] = MaterialList;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Profile', Validators.required],
      brand: ['', Validators.required],
      finish: ['', Validators.required],
      patti_price: [0, Validators.required],
      handal_price: [0, Validators.required],
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
      this.materialForm.get('patti_price')?.patchValue(material?.patti_price);
      this.materialForm.get('handal_price')?.patchValue(material?.handal_price);
      this.materialForm.get('image')?.patchValue(material?.image);
    }
  }

  save() {
    console.log(this.materialForm.value);

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
