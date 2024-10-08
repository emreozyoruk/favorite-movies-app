import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from '../movie-item/movie-item.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MovieItemComponent] 
})
export class MovieListComponent {
  movies: { id: number; title: string; rating: number; genre: string; year: number, editing?: boolean }[] = [];
  filteredMovies = [...this.movies]; 
  movieForm: FormGroup;
  filterForm: FormGroup; 
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    if (this.isBrowser()) {
      this.loadMovies(); 
    }

    
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]], 
      genre: ['', [Validators.required]], 
      rating: ['', [Validators.required, Validators.min(1), Validators.max(10)]], 
      year: ['', [Validators.required, Validators.min(1900)]] 
    });

  
    this.filterForm = this.fb.group({
      search: [''],
      rating: [''],
      genre: [''],
      year: ['']
    });
  }

  
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  
  loadMovies() {
    const storedMovies = localStorage.getItem('movies');
    this.movies = storedMovies ? JSON.parse(storedMovies) : [];
    this.filteredMovies = [...this.movies]; 
  }

  
  addMovie() {
    if (this.movieForm.invalid) {
      this.errorMessage = 'Tüm alanları doldurun!';
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: this.movieForm.get('title')?.value.trim(),
      genre: this.movieForm.get('genre')?.value,
      rating: this.movieForm.get('rating')?.value,
      year: this.movieForm.get('year')?.value
    };

    this.movies.push(newMovie);
    this.saveMovies();
    this.movieForm.reset(); 
    this.errorMessage = null; 
    this.onFilter(); 
  }

 
  saveMovies() {
    if (this.isBrowser()) {
      localStorage.setItem('movies', JSON.stringify(this.movies));
    }
  }

  
  deleteMovie(id: number) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    this.saveMovies();
    this.onFilter(); 
  }


  editMovie(movie: { id: number; title: string; genre: string; rating: number; year: number, editing?: boolean }) {
    movie.editing = true;
  }

  
  updateMovie(movie: { id: number; title: string; genre: string; rating: number; year: number, editing?: boolean }) {
    movie.editing = false;
    this.saveMovies(); 
    this.onFilter(); 
  }

  
  onFilter() {
    const { search, rating, genre, year } = this.filterForm.value;

    this.filteredMovies = this.movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
      const matchesRating = rating ? movie.rating >= parseFloat(rating) : true;
      const matchesGenre = genre ? movie.genre === genre : true;
      const matchesYear = year ? movie.year === year : true;

      return matchesSearch && matchesRating && matchesGenre && matchesYear;
    });
  }
}
