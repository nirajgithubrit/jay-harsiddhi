import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account-pending',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account-pending.component.html',
  styleUrl: './account-pending.component.scss'
})
export class AccountPendingComponent {

  constructor(private router: Router, private authService: AuthService) { }

  backToLogin() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
