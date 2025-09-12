import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FirstLetterPipe } from '../../../pipes/first-letter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FirstLetterPipe],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  profileName = 'John Doe';
  profileImage: any;
  // 'https://randomuser.me/api/portraits/men/75.jpg';
}
