import React, { useEffect, useState } from 'react';
import { getItems, Item } from '../services/api';
import { AxiosError } from 'axios';

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getItems();
                setItems(fetchedItems);
                setLoading(false);
            } catch (err) {
                // Use the appropriate error type (AxiosError)
                if (err instanceof AxiosError) {
                    console.error('Error fetching items:', err.response?.data);
                } else {
                    console.error('Unexpected error:', err);
                }
                setError('Failed to fetch items');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Items List</h1>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.name} - {item.brand}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
