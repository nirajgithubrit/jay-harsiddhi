import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.scss',
})
export class ColorListComponent implements OnInit {
  finishes: any = [];

  constructor(private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllItem('color').subscribe((res) => {
      this.finishes = res
    })
  }

  updateFinish(finish: any) {
    this.router.navigateByUrl('admin/edit-color/' + finish._id);
  }

  deleteFinish(finish: any) {
    if (confirm('Delete brand: ' + finish.name + '?')) {
      this.adminService.deleteItem('color', finish._id).subscribe((res) => {
        this.finishes = this.finishes.filter((f: any) => f !== finish);
      })
    }
  }

  openAddColor() {
    this.router.navigateByUrl('admin/add-color');
  }
}
