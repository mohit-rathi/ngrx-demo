import { createActionGroup, props } from '@ngrx/store';
import { IBook } from './book.model';

export const BookActions = createActionGroup({
  source: 'BookList Component',
  events: {
    addBook: props<{ book: IBook }>(),
    updateBook: props<{ book: IBook }>(),
    deleteBook: props<{ id: number }>(),
  },
});
