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

  finishes = [
    { id: 1, name: 'Black' },
    { id: 2, name: 'Glossy Gray' },
    { id: 3, name: 'Matt Gray' },
    { id: 4, name: 'Rose Gold' },
    { id: 5, name: 'Golden' },
    { id: 6, name: 'Aluminium' },
    { id: 7, name: 'Steel' },
  ];

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

  ngOnInit(): void {
    const colorId = parseInt(this.activatedRoute.snapshot.params['id']);
    if (colorId) {
      this.isEditMode = true;
      const color = this.getColor(colorId);
      this.colorForm.get('name')?.patchValue(color?.name);
    }
  }

  save() {
    this.adminService.setTab(3);
    this.router.navigateByUrl('admin');
  }

  private getColor(id: number) {
    return this.finishes.find((f: any) => f.id == id);
  }
}
