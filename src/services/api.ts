import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/items';

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

export const getItems = async (): Promise<Item[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (err: unknown) {
        // Type assertion to AxiosError to access error properties
        if (err instanceof AxiosError) {
            console.error('Error fetching items:', err.response?.data);
        } else {
            console.error('Unexpected error:', err);
        }
        throw new Error('Failed to fetch items');
    }
};
