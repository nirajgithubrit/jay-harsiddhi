import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FirstLetterPipe } from '../../../pipes/first-letter.pipe';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FirstLetterPipe],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  profileImage: any;
  menuOpen = false;

  constructor(private router: Router,
    public authService: AuthService) { }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }
}
