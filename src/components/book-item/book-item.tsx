import { useAppDispatch, useAppSelector } from '../../types/hooks';
import noImage from '../../images/noImage.jpg';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { showModal } from '../../services/slices/modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import styles from './book-item.module.css';
const BookItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const book = useAppSelector((store) => store.books.currentBook)!;
  const isShowedModal = useAppSelector((store) => store.modal.isShowedModal);

  useEffect(() => {
    dispatch(showModal(true));
  }, []);

  const handleCloseModal = () => {
    dispatch(showModal(false));
    navigate('/');
  };

  const Image = styled.img`
    width: 100%;
  `;

  return (
    <Modal show={isShowedModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header onClick={handleCloseModal} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {book.volumeInfo.title ? book.volumeInfo.title : 'Неизвестно'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <Image
                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noImage}
                className="img-fluid rounded-start"
                alt={book.volumeInfo.title ? book.volumeInfo.title : 'Неизвестно'}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  Авторы: {book.volumeInfo.authors ? book.volumeInfo.authors.map((author) => author) : 'Неизвестно'}
                </h5>
                <p className={`card-text ${styles.cardBody}`}>
                  {book.volumeInfo.description ? book.volumeInfo.description : 'Неизвестно'}
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    {book.volumeInfo.categories ? book.volumeInfo.categories.map((category) => category) : 'Неизвестно'}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookItem;
