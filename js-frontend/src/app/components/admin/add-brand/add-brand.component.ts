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

  brands = [
    { id: 1, name: 'Blandox' },
    { id: 2, name: 'Bajarang' },
    { id: 3, name: 'Hettich' },
    { id: 4, name: 'Sain-Globin' },
  ];

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
  ngOnInit(): void {
    const brandId = parseInt(this.activatedRoute.snapshot.params['id']);
    if (brandId) {
      this.isEditMode = true;
      const brand = this.getBrand(brandId);
      this.brandForm.get('name')?.patchValue(brand?.name);
    }
  }

  save() {
    this.adminService.setTab(1);
    this.router.navigateByUrl('admin');
  }

  private getBrand(id: number) {
    return this.brands.find((b: any) => b.id == id);
  }
}
