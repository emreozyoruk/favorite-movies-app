import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], 
})
export class MovieItemComponent {
  @Input() movie: {
    id: number;
    title: string;
    genre: string;
    rating: number;
    year: number;
  } | null = null;

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; newTitle: string }>();

  isEditing: boolean = false;
  editedTitle: string = '';

  ngOnInit() {
    if (this.movie) {
      this.editedTitle = this.movie.title; 
    }
  }

  onDelete() {
    if (this.movie) {
      this.delete.emit(this.movie.id);
    }
  }

  onUpdate() {
    if (this.movie && this.editedTitle.trim()) {
      this.update.emit({ id: this.movie.id, newTitle: this.editedTitle.trim() });
      this.isEditing = false; 
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; 
  }
}
