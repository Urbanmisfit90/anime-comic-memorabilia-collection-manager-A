import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:5000/items'; // Assuming your backend runs on localhost:5000

// Get all items
export const getItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;  // Returns the items data
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Get a single item by ID
export const getItemById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching item with id ${id}:`, error);
        throw error;
    }
};

// Create a new item
export const createItem = async (itemData: { name: string, brand: string, type: string }) => {
    try {
        const response = await axios.post(API_URL, itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

// Update an existing item
export const updateItem = async (id: string, itemData: { name: string, brand: string, type: string }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, itemData);
        return response.data;
    } catch (error) {
        console.error(`Error updating item with id ${id}:`, error);
        throw error;
    }
};

// Delete an item by ID
export const deleteItem = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error);
        throw error;
    }
};