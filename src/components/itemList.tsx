import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchItems } from '../redux/itemsSlice';
import { CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const ItemList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

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
