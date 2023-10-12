import styled from 'styled-components';
import { IBooksList } from '../../types/components';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import noImage from '../../images/noImage.jpg';
import { NavLink } from 'react-router-dom';
import { setCurrentBook } from '../../services/slices/books';

const Section = styled.main`
  margin-top: 20px;
  padding: 0 20px 0;
`;

const H4 = styled.h4`
  text-align: center;
`;

const GridContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.li`
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  }
`;

const BooksList: React.FC<IBooksList> = ({ books }) => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector((store) => store.books.total);

  const setBookId = (bookId: string) => dispatch(setCurrentBook(bookId));

  const renderBooks = books.map((book) => {
    const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage;
    return (
      <Card key={book.id} className="card text-center">
        <NavLink
          onClick={() => setBookId(book.id)}
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={`books/${book.id}`}>
          <div className="card-header">{book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Неизвестно'}</div>
          <img src={image} className="card-img-top" alt={book.volumeInfo.title} />
          <div className="card-body">
            <h5 className="card-title mb-4">{book.volumeInfo.title}</h5>
          </div>
          <div className="card-footer text-body-secondary">
            {book.volumeInfo.authors ? book.volumeInfo.authors.map((author) => author) : 'Неизвестно'}
          </div>
        </NavLink>
      </Card>
    );
  });

  return (
    <main>
      <Section>
        <H4>Найденно {totalItems ? totalItems : 'Неизвестно'} результатов</H4>
        <GridContainer>{renderBooks}</GridContainer>
      </Section>
    </main>
  );
};

export default BooksList;
