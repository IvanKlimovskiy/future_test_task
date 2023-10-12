import styled from 'styled-components';
import notFoundImage from '../../images/404error.jpg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: auto;
`;

const Image = styled.img`
  height: 100vh;
  width: 100vw;
`;

const NotFoundPage = () => {
  return (
    <Container>
      <Image src={notFoundImage} alt="Страница не найдена" />
    </Container>
  );
};

export default NotFoundPage;
