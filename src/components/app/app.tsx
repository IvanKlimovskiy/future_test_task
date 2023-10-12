import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { fetchBooks } from '../../services/slices/books';
import Spinner from '../../spinner/spinner';
import { defaultSearchingOptions } from '../../constants';
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
    <Router>
      <Routes>
        <Route path="/" element={<MainPage books={books} />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="books/:bookId" element={<SingleBook books={books} />} />
      </Routes>
    </Router>
  );
};

export default App;
