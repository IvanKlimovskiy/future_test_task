import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { fetchBooks } from '../../services/slices/books';
import Spinner from '../../spinner/spinner';
import {
  PATH_BOOK_LIST,
  PATH_SINGLE_BOOK,
  defaultSearchingOptions,
  BASE_URL_PROD,
  BASE_URL_DEV,
} from '../../constants';
import { MainPage, NotFoundPage } from '../../pages';
import SingleBook from '../../pages/single-book';

const App = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((store) => store.books.books);
  const loading = useAppSelector((store) => store.books.loading);
  const firstRender = useAppSelector((store) => store.books.firstRender);

  useEffect(() => {
    dispatch(fetchBooks(defaultSearchingOptions));
  }, []);

  return loading && firstRender ? (
    <Spinner height="100vh" />
  ) : (
    <Router basename={BASE_URL_DEV}>
      <Routes>
        <Route path={PATH_BOOK_LIST} element={<MainPage books={books} />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path={PATH_SINGLE_BOOK} element={<SingleBook books={books} />} />
      </Routes>
    </Router>
  );
};

export default App;
