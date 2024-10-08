import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes'; 

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}
