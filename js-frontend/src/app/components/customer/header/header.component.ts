import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirstLetterPipe } from '../../../pipes/first-letter.pipe';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FirstLetterPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  profileName = 'John Doe';
  profileImage: any;
  menuOpen = false;

  constructor(private router: Router, private authService: AuthService) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }
}
