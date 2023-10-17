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

export const translateCategories = (category: string) => {
  switch (category) {
    case 'Art':
      return 'Искусство';
    case 'Biography':
      return 'Биография';
    case 'Computers':
      return 'Компьютеры';
    case 'History':
      return 'История';
    case 'Medical':
      return 'Медицина';
    case 'Poetry':
      return 'Поэзия';
    default:
      return category;
  }
};
