import axios from 'axios';

// Define the Item type
export interface Item {
  _id: string;
  name: string;
  brand: string;
  series?: string;
  character?: string;
  type?: string;
  condition?: string;
  tags?: string;
  photo?: string;
}

// Define the API URL, default to local backend if environment variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/items';

// Get all items (returns an array of items)
export const getItems = async (): Promise<Item[]> => {
    try {
        const response = await axios.get<Item[]>(API_URL); // Specify the type of the response
        return response.data; // Response will be typed as Item[]
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Create a new item (returns the created item)
export const createItem = async (item: Item): Promise<Item> => {
    try {
        const response = await axios.post<Item>(API_URL, item); // Specify the type of the response
        return response.data; // Response will be typed as Item
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};