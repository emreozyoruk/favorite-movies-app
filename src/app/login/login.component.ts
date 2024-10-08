import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HeaderComponent,FooterComponent], 
})
export class LoginComponent {
  loginForm: FormGroup; 
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
   
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(5)]], 
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Kullanıcı adı veya şifre boş bırakılamaz!';
      return;
    }

    const { username, password } = this.loginForm.value;

    
    if (username === 'Emre' && password === '12345') {
      
      localStorage.setItem('user', JSON.stringify({ username , password}));

      
      this.router.navigate(['/dashboard']);
    } else {
      
      this.errorMessage = 'Kullanıcı adı veya şifre hatalı!';
    }
  }
}
