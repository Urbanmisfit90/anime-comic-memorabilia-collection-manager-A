import axios from 'axios';

export interface Item {
  _id: string;
  name: string;
  brand: string;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>('/api/items');
  return response.data;
};



