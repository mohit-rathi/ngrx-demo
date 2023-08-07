import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBook } from '../store/books/book.model';
import { Store } from '@ngrx/store';
import { BookActions } from '../store/books/book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  public bookForm!: FormGroup;

  public bookList$!: Observable<IBook[]>;

  public editBook: IBook | undefined;

  constructor(
    private store: Store<{ books: IBook[] }>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.bookList$ = this.store.select('books');
  }

  public initializeForm(): void {
    this.bookForm = this.fb.group({
      title: this.fb.control(this.editBook?.title ?? null, [
        Validators.required,
      ]),
      description: this.fb.control(this.editBook?.description ?? null, [
        Validators.required,
      ]),
    });
  }

  public addBook(): void {
    const book: IBook = {
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
    };
    this.store.dispatch(BookActions.addbook({ book }));
    this.bookForm.reset();
  }

  public updateBook(): void {
    const book: IBook = {
      id: this.editBook?.id,
      title: this.bookForm.value.title,
      description: this.bookForm.value.description,
    };
    this.store.dispatch(BookActions.updatebook({ book }));
    this.onCancel();
  }

  public onEdit(id: number, book: IBook): void {
    this.editBook = {
      id: id,
      title: book.title,
      description: book.description,
    };
    this.initializeForm();
  }

  public onCancel(): void {
    this.editBook = undefined;
    this.initializeForm();
  }

  public deleteBook(id: number): void {
    this.onCancel();
    if (confirm('Are you sure you want to delete this book?')) {
      this.store.dispatch(BookActions.deletebook({ id: id }));
    }
  }
}
