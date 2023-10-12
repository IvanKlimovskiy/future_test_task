import BooksList from '../../components/books-list/books-list';
import AppHeader from '../../components/app-header/app-header';
import { IBooksList } from '../../types/components';
import React from 'react';

const MainPage: React.FC<IBooksList> = ({ books }) => {
  return (
    <>
      <AppHeader />
      <BooksList books={books} />
    </>
  );
};

export default MainPage;
