import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, EditProfileComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('nghiem-linh-language-web');
}
