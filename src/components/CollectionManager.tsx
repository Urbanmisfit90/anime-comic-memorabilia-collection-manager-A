import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addItem, removeItem } from '../redux/collectionSlice';
import { CollectionItem } from '../redux/collectionSlice';

const CollectionManager: React.FC = () => {
  const dispatch = useDispatch();

  // Get the collection items from the Redux store
  const collection = useSelector((state: RootState) => state.collection.items);

  const [newItem, setNewItem] = useState<CollectionItem>({
    id: '',
    name: '',
    brand: '',
    series: '',
    character: '',
    type: '',
    condition: '',
    tags: [],
    photoUrl: '',
  });

  const handleAddItem = () => {
    // Add item to the collection
    dispatch(addItem(newItem));

    // Reset the form after submission
    setNewItem({
      id: '',
      name: '',
      brand: '',
      series: '',
      character: '',
      type: '',
      condition: '',
      tags: [],
      photoUrl: '',
    });
  };

  const handleRemoveItem = (id: string) => {
    // Remove item from the collection
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h1>Collection Manager</h1>
      
      <div>
        <h2>Add Item</h2>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={newItem.brand}
          onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
          placeholder="Brand"
        />
        {/* Add other form inputs similarly */}

        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div>
        <h2>My Collection</h2>
        {collection.map((item: CollectionItem) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.brand}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            {/* Render more item details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionManager;
