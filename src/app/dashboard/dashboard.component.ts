import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MovieListComponent,FooterComponent,HeaderComponent],
})
export class DashboardComponent {
  username: string | null = null;

  constructor() {
    if (this.isBrowser()) {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      this.username = user ? user.username : null;
    }
  }


  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
