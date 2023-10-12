import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../../../types';
import { IBooksState } from '../../../types/reducers';
import { getBooks } from '../../../utils';
import { RootState } from '../../store';
import { defaultSearchingOptions } from '../../../constants';

export const fetchBooks = createAsyncThunk<
  IData,
  {
    searchValue: string;
    category: string;
    sortingBy: string;
    startIndex?: number;
  }
>('books/fetchBooks', async ({ searchValue, category, sortingBy, startIndex }, { getState }) => {
  const state = getState() as RootState;
  startIndex = state.books.startIndex;
  return await getBooks(searchValue, category, sortingBy, startIndex);
});

const initialState: IBooksState = {
  firstRender: true,
  loading: true,
  booksRequest: false,
  booksFailed: false,
  books: [],
  currentBook: undefined,
  total: 0,
  startIndex: 0,
  searchOptions: defaultSearchingOptions,
  isNewSearch: true,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setCurrentBook: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.currentBook = state.books.find((book) => book.id === id);
    },
    setSearchOptions: (
      state,
      action: PayloadAction<{
        searchValue: string;
        category: string;
        sortingBy: string;
      }>
    ) => {
      state.searchOptions = action.payload;
    },
    setIsNewSearch: (state) => {
      state.isNewSearch = true;
    },
    setDefaultIndex: (state) => {
      state.startIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.booksRequest = true;
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      if (state.startIndex > 0 && !state.isNewSearch) {
        const filteredBooks = action.payload.items.filter((book, index, array) => {
          return index === array.findIndex((el) => el.id === book.id);
        });
        state.books.push(...filteredBooks);
        state.startIndex = state.startIndex + 30;
        state.loading = false;
      } else {
        state.books = action.payload.items.filter((book, index, array) => {
          return index === array.findIndex((el) => el.id === book.id);
        });
        state.total = action.payload.totalItems;
        state.loading = false;
        state.startIndex = 30;
        state.firstRender = false;
        state.isNewSearch = false;
      }
    });

    builder.addCase(fetchBooks.rejected, (state) => {
      state.loading = false;
      state.booksFailed = true;
      state.booksRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { actions, reducer } = books;
export const { setCurrentBook, setSearchOptions, setIsNewSearch, setDefaultIndex } = actions;
export default reducer;
