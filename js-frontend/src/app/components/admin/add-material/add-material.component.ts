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
  materialId?: string

  categories: any = [];
  brands: any = [];
  finishes: any = [];
  materials: Material[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['Profile', Validators.required],
      brandId: ['', Validators.required],
      finishId: ['', Validators.required],
      pattiPrice: [0, Validators.required],
      handalPrice: [0, Validators.required],
      image: [''],
      imageName: [''],
    });
  }
  async ngOnInit() {

    this.categories = await this.getItems('category')
    this.brands = await this.getItems('brand')
    this.finishes = await this.getItems('color')

    this.materialId = this.activatedRoute.snapshot.params['id'];
    if (this.materialId) {
      this.isEditMode = true;
      const material = await this.getMaterial(this.materialId);

      this.materialForm.get('name')?.patchValue(material?.name);
      this.materialForm.get('categoryId')?.patchValue(material?.categoryId);
      this.materialForm.get('brandId')?.patchValue(material?.brandId);
      this.materialForm.get('finishId')?.patchValue(material?.finishId);
      this.materialForm.get('pattiPrice')?.patchValue(material?.pattiPrice);
      this.materialForm.get('handalPrice')?.patchValue(material?.handalPrice);
      this.materialForm.get('image')?.patchValue(material?.image);
    }
  }

  save() {
    console.log(this.materialForm.value);


    if (this.isEditMode && this.materialId) {
      this.adminService.updateItem('material', this.materialId, this.materialForm.value as any).subscribe((res) => {
        this.adminService.setTab(0);
        this.router.navigateByUrl('/admin');
      })
    } else {
      this.adminService.addItem('material', this.materialForm.value as any).subscribe((res) => {
        this.adminService.setTab(0);
        this.router.navigateByUrl('/admin');
      })
    }
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

  close() { }

  async getMaterial(id: string): Promise<any> {
    return new Promise((resolve, rejct) => {
      this.adminService.getItemById('material', id).subscribe((res) => {
        resolve(res)
      })
    })
  }

  async getItems(routeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.getAllItem(routeName).subscribe((res) => {
        resolve(res)
      })
    })
  }

  getProfileCategoryId() {
    return this.categories.find((c: any) => c.name == 'Profile')?._id
  }
}
