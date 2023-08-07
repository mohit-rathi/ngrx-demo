import { createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { IBook } from './book.model';

export const initialState: IBook[] = [];

export const bookReducer = createReducer(
  initialState,
  on(BookActions.addbook, (state, action) => [
    ...state,
    { title: action.book.title, description: action.book.description },
  ]),
  on(BookActions.updatebook, (state, action) => {
    const updatedBook: IBook = {
      title: action.book.title,
      description: action.book.description,
    };
    const updatedBooks = [...state];
    updatedBooks[action.book.id!] = updatedBook;
    return [...updatedBooks];
  }),
  on(BookActions.deletebook, (state, action) =>
    state.filter((b, i) => i != action.id)
  )
);
