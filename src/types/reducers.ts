import { IBook } from './index';

export interface IBooksState {
  firstRender: boolean;
  loading: boolean;
  booksRequest: boolean;
  booksFailed: boolean;
  books: IBook[];
  currentBook: IBook | undefined;
  total: number;
  startIndex: number;
  searchOptions: {
    searchValue: string;
    category: string;
    sortingBy: string;
  };
  isNewSearch: boolean;
}

export interface IModalState {
  isShowedModal: boolean;
}
