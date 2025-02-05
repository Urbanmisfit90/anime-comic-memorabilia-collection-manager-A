import React, { useEffect, useState } from 'react';
import { getItems, Item } from '../services/api';
import { AxiosError } from 'axios';
import { CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

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

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Items List
            </Typography>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            <List>
                {items.map((item) => (
                    <ListItem key={item._id} divider>
                        <ListItemText primary={item.name} secondary={item.brand} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ItemList;

