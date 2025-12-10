import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, AdminHeaderComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  isEditMode: boolean = false;
  categoryForm: FormGroup;
  categoryId?: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.params['id'];
    if (this.categoryId) {
      this.isEditMode = true;
      const category = await this.getCategory(this.categoryId);
      this.categoryForm.get('name')?.patchValue(category.name);
    }
  }

  save() {
    if (this.isEditMode && this.categoryId) {
      this.adminService.updateItem('category', this.categoryId, this.categoryForm.value).subscribe((res) => {
        this.adminService.setTab(2);
        this.router.navigateByUrl('admin');
      })
    } else {
      this.adminService.addItem('category', this.categoryForm.value).subscribe((res) => {
        this.adminService.setTab(2);
        this.router.navigateByUrl('admin');
      })
    }

  }

  async getCategory(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.getItemById('category', id).subscribe((res) => {
        resolve(res)
      })
    })
  }
}
