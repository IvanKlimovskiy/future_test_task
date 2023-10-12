import { API_KEY, URL } from '../constants';
import { IData } from '../types';
function checkResponse(res: Response): Promise<IData> {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getBooks = async (searchValue: string, category: string, sortingBy: string, startIndex: number = 0) => {
  const response = await fetch(
    `${URL}?q=${searchValue}+subject:${category}&orderBy=${sortingBy}&key=${API_KEY}&startIndex=${startIndex}&maxResults=30`
  );
  return checkResponse(response);
};
