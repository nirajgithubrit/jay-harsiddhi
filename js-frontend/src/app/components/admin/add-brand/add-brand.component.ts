import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule, AdminHeaderComponent],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss',
})
export class AddBrandComponent implements OnInit {
  isEditMode: boolean = false;
  brandForm: FormGroup;
  brandId?: string

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this,
      (this.brandForm = this.fb.group({
        name: ['', Validators.required],
      }));
  }
  async ngOnInit() {
    this.brandId = this.activatedRoute.snapshot.params['id'];
    if (this.brandId) {
      this.isEditMode = true;
      const brand = await this.getBrand(this.brandId);
      this.brandForm.get('name')?.patchValue(brand.name);
    }
  }

  save() {
    if (this.isEditMode && this.brandId) {
      this.adminService.updateItem('brand', this.brandId, this.brandForm.value).subscribe((res) => {
        this.adminService.setTab(2);
        this.router.navigateByUrl('admin');
      })
    } else {
      this.adminService.addItem('brand', this.brandForm.value).subscribe((res) => {
        this.adminService.setTab(2);
        this.router.navigateByUrl('admin');
      })
    }
  }

  async getBrand(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.getItemById('brand', id).subscribe((res) => {
        resolve(res)
      })
    })
  }
}
