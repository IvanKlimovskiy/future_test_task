import styled from 'styled-components';
import styles from './book-list.module.css';
import { IBooksList } from '../../types/components';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import noImage from '../../images/noImage.jpg';
import { NavLink } from 'react-router-dom';
import { fetchBooks, setCurrentBook } from '../../services/slices/books';
import React from 'react';
import { Button } from 'react-bootstrap';
import { translateCategories } from '../../utils';

const Section = styled.main`
  margin-top: 20px;
  padding: 0 20px 0;
`;

const H4 = styled.h4`
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 350px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
`;

const BooksList: React.FC<IBooksList> = ({ books }) => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((store) => store.books.total);
  const loading = useAppSelector((store) => store.books.loading);
  const searchOptions = useAppSelector((store) => store.books.searchOptions);

  const setBookId = (bookId: string) => dispatch(setCurrentBook(bookId));

  const loadMoreBooks = () => {
    dispatch(fetchBooks(searchOptions));
  };

  const renderBooks = books.map((book, index) => {
    const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage;
    return (
      <NavLink
        key={index}
        className={`card text-center ${styles.bookItem}`}
        onClick={() => setBookId(book.id)}
        to={`books/${book.id}`}>
        <div className="card-header">
          {book.volumeInfo.categories ? translateCategories(book.volumeInfo.categories[0]) : 'Неизвестно'}
        </div>
        <img src={image} className="card-img-top" alt={book.volumeInfo.title} />
        <div className="card-body">
          <h5 className="card-title mb-4">{book.volumeInfo.title}</h5>
        </div>
        <div className="card-footer text-body-secondary">
          {book.volumeInfo.authors ? book.volumeInfo.authors.map((author) => author) : 'Неизвестно'}
        </div>
      </NavLink>
    );
  });

  return (
    <main>
      <Section>
        <H4>Найденно {totalItems ? totalItems : 'Неизвестно'} результатов</H4>
        <GridContainer>{renderBooks}</GridContainer>
        <ButtonWrapper>
          <Button disabled={loading} onClick={loadMoreBooks}>
            {loading ? 'Загружается' : 'Загрузить ещё'}
          </Button>
        </ButtonWrapper>
      </Section>
    </main>
  );
};

export default BooksList;
