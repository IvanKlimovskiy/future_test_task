import { API_KEY, URL } from '../constants';
import { IData } from '../types';
function checkResponse(res: Response): Promise<IData> {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getBooks = async (searchValue: string, category: string, sortingBy: string) => {
  const response = await fetch(
    `${URL}?q=${searchValue}+subject:${category}&orderBy=${sortingBy}&key=${API_KEY}&startIndex=0&maxResults=30`
  );
  return checkResponse(response);
};

export const getBook = async (bookId: string) => {
  const response = await fetch(`${URL}${bookId}&key=${API_KEY}`);
  return checkResponse(response);
};
