import MainPage from '../main-page';
import BookItem from '../../components/book-item/book-item';
import React from 'react';
import { IBookItem } from '../../types/components';

const SingleBook: React.FC<IBookItem> = ({ books }) => {
  return (
    <>
      <MainPage books={books} />
      <BookItem />
    </>
  );
};

export default SingleBook;
