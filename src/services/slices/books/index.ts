import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBooksState, IData } from '../../../types';
import { getBooks } from '../../../utils';

export const fetchBooks = createAsyncThunk<IData, { searchValue: string; category: string; sortingBy: string }>(
  'books/fetchBooks',
  async ({ searchValue, category, sortingBy }) => {
    return await getBooks(searchValue, category, sortingBy);
  }
);

const initialState: IBooksState = {
  loading: true,
  booksRequest: false,
  booksFailed: false,
  books: [],
  currentBook: undefined,
  total: 0,
};

const burgerIngredients = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCurrentBook: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const book = state.books.find((book) => book.id === id);
      state.currentBook = book;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.booksRequest = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload.items.filter((book, index, array) => {
        return index === array.findIndex((el) => el.id === book.id);
      });
      state.total = action.payload.totalItems;
      state.loading = false;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.loading = false;
      state.booksFailed = true;
      state.booksRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { actions, reducer } = burgerIngredients;
export const { setCurrentBook } = actions;
export default reducer;
