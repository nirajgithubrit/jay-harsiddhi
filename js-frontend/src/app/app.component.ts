import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'js-frontend';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const getToken = localStorage.getItem('accessToken')
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin']);
    } else if (this.authService.isSalesPerson()) {
      this.router.navigate(['/']);
    } else if (getToken) {
      this.router.navigate(['/account-pending'])
    } else {
      this.router.navigate(['/login'])
    }
  }
}
