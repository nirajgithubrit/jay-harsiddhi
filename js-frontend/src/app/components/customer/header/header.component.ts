import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirstLetterPipe } from '../../../pipes/first-letter.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FirstLetterPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  profileName = 'John Doe';
  profileImage: any;
}
