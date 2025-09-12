import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.scss',
})
export class ColorListComponent {
  finishes = [
    { id: 1, name: 'Black' },
    { id: 2, name: 'Glossy Gray' },
    { id: 3, name: 'Matt Gray' },
    { id: 4, name: 'Rose Gold' },
    { id: 5, name: 'Golden' },
    { id: 6, name: 'Aluminium' },
    { id: 7, name: 'Steel' },
  ];

  constructor(private router: Router) {}

  updateFinish(finish: any) {
    this.router.navigateByUrl('admin/edit-color/' + finish.id);
  }

  deleteFinish(finish: any) {
    // Add your delete logic here
    if (confirm('Delete brand: ' + finish.name + '?')) {
      this.finishes = this.finishes.filter((f) => f !== finish);
    }
  }

  openAddColor() {
    this.router.navigateByUrl('admin/add-color');
  }
}
