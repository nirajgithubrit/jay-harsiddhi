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
    if (this.authService.isAdmin()) {
      this.router.navigateByUrl('admin');
    } else if (this.authService.isSalesPerson()) {
      this.router.navigateByUrl('');
    } else {
      this.router.navigateByUrl('account-pending')
    }
  }
}
