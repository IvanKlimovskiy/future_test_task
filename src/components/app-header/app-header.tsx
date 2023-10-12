import styled from 'styled-components';
import bgImage from '../../images/bg.jpg';
import Search from '../search/search';

const Header = styled.header`
  min-height: 400px;
  background-position: 50%;
  background-image: url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
`;

const H1 = styled.h1`
  color: white;
  font-size: 50px;
  text-align: center;
  margin-bottom: 50px;
`;

const AppHeader = () => {
  return (
    <Header>
      <H1>Поиск книг</H1>
      <Search />
    </Header>
  );
};

export default AppHeader;
