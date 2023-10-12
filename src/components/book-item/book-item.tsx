import styled from 'styled-components';
import { useAppSelector } from '../../types/hooks';
import Spinner from '../../spinner/spinner';
import noImage from '../../images/noImage.jpg';

const Book = styled.div`
  display: flex;
  min-height: 600px;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 400px;
  width: 100%;
`;

const BookItem = () => {
  const book = useAppSelector((store) => store.books.currentBook)!;
  let loading = book === null;

  return loading ? (
    <Spinner height="100vh" />
  ) : (
    <Book>
      <Image className="m-4" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage} alt="" />
      <div className="card mb-3 m-4">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{book.volumeInfo.title ? book.volumeInfo.title : 'Неизвестно'}</h5>
              <p className="card-text">
                {book.volumeInfo.authors ? book.volumeInfo.authors.map((author) => author) : 'Неизвестно'}
              </p>
              <p className="card-text">{book.volumeInfo.description ? book.volumeInfo.description : 'Неизвестно'}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {book.volumeInfo.categories ? book.volumeInfo.categories.map((category) => category) : 'Неизвестно'}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Book>
  );
};

export default BookItem;
