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

  categories = [
    { id: 1, name: 'Profile' },
    { id: 2, name: 'Hinges' },
    { id: 3, name: 'Glass' },
    { id: 4, name: 'Connector' },
  ];

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
  ngOnInit(): void {
    const categoryId = parseInt(this.activatedRoute.snapshot.params['id']);
    if (categoryId) {
      this.isEditMode = true;
      const category = this.getCategory(categoryId);
      this.categoryForm.get('name')?.patchValue(category?.name);
    }
  }

  save() {
    this.adminService.setTab(2);
    this.router.navigateByUrl('admin');
  }

  private getCategory(id: number) {
    return this.categories.find((c: any) => c.id == id);
  }
}
