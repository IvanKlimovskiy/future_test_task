import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { MainPage, NotFoundPage } from '../../pages';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { fetchBooks } from '../../services/slices/books';
import Spinner from '../../spinner/spinner';
import { defaultSearchingOptions } from '../../constants';
import BookItem from '../book-item/book-item';

const App = () => {
  const dispatch = useAppDispatch();

  const books = useAppSelector((store) => store.books.books);
  const loading = useAppSelector((store) => store.books.loading);

  useEffect(() => {
    dispatch(fetchBooks(defaultSearchingOptions));
  }, []);

  return loading ? (
    <Spinner height="100vh" />
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage books={books} />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="books/:bookId" element={<BookItem />} />
      </Routes>
    </Router>
  );
};

export default App;
