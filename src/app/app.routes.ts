import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Lazy load için loadComponent kullanıyoruz
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'movie-list', 
        loadComponent: () => import('./movie-list/movie-list.component').then(m => m.MovieListComponent) 
      }
    ]
  }
];
