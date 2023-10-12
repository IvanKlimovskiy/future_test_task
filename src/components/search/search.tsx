import styled from 'styled-components';
import React, { useState } from 'react';
import { useAppDispatch } from '../../types/hooks';
import { fetchBooks, setDefaultIndex, setIsNewSearch, setSearchOptions } from '../../services/slices/books';
const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  color: white;
  font-size: 20px;
  @media (max-width: 398px) {
    font-size: 15px;
  }
`;

const Select = styled.select`
  @media (max-width: 398px) {
    font-size: 11px;
  }
`;

const Input = styled.input`
  @media (max-width: 398px) {
    font-size: 11px;
  }
`;

const Button = styled.button`
  margin: 0 auto;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');
  const [sortingBy, setSortingBy] = useState('relevance');

  const dispatch = useAppDispatch();

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSearchSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  const handleSearchSelectSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingBy(event.currentTarget.value);
  };
  const handleSearch = () => {
    dispatch(setDefaultIndex());
    dispatch(setIsNewSearch());
    dispatch(fetchBooks({ searchValue, category, sortingBy }));
    dispatch(setSearchOptions({ searchValue, category, sortingBy }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Form>
      <div className="mb-1">
        <Label htmlFor="search" className="form-label">
          Найти
        </Label>
        <Input
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          value={searchValue}
          type="text"
          className="form-control"
          id="search"
          placeholder="Поиск..."
        />
      </div>
      <div className="row">
        <div className="col">
          <Label htmlFor="exampleFormControlInput1" className="form-label">
            Категории
          </Label>
          <Select onChange={handleSearchSelectCategory} className="form-select" aria-label="Select categories">
            <option defaultValue={category}>Все</option>
            <option value="art">Искусство</option>
            <option value="biography">Биография</option>
            <option value="computers">Компьютеры</option>
            <option value="history">История</option>
            <option value="medical">Медицина</option>
            <option value="poetry">Поэзия</option>
          </Select>
        </div>
        <div className="col">
          <Label htmlFor="exampleFormControlInput1" className="form-label">
            Отсортировать по
          </Label>
          <Select onChange={handleSearchSelectSorting} className="form-select" aria-label="Select sorting by">
            <option defaultValue={sortingBy}>Релевантности</option>
            <option value="newest">Новизне</option>
          </Select>
        </div>
      </div>
      <Button
        disabled={searchValue === ''}
        onClick={handleSearch}
        type="button"
        className="btn btn-light btn-lg mb-4 mt-4">
        Найти
      </Button>
    </Form>
  );
};

export default Search;
