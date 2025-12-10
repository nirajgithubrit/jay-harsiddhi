import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-color',
  standalone: true,
  imports: [ReactiveFormsModule, AdminHeaderComponent],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.scss',
})
export class AddColorComponent implements OnInit {
  isEditMode: boolean = false;
  colorForm: FormGroup;
  colorId?: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.colorForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.colorId = this.activatedRoute.snapshot.params['id'];
    if (this.colorId) {
      this.isEditMode = true;
      const color = await this.getColor(this.colorId);
      this.colorForm.get('name')?.patchValue(color.name);
    }
  }

  save() {
    if (this.isEditMode && this.colorId) {
      this.adminService.updateItem('color', this.colorId, this.colorForm.value).subscribe((res) => {
        this.adminService.setTab(3);
        this.router.navigateByUrl('admin');
      })
    } else {
      this.adminService.addItem('color', this.colorForm.value).subscribe((res) => {
        this.adminService.setTab(3);
        this.router.navigateByUrl('admin');
      })
    }
  }

  async getColor(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adminService.getItemById('color', id).subscribe((res) => {
        resolve(res)
      })
    })
  }
}
