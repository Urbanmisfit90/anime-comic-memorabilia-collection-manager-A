import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../redux/collectionSlice'; // Correct import
import { addItem, removeItem } from '../redux/collectionSlice';
import { RootState } from '../redux/store';

function CollectionManager() {
  const dispatch = useDispatch();
  const collection = useSelector((state: RootState) => state.collection.items);

  const handleSaveItem = (newItem: Item) => {
    dispatch(addItem(newItem));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div>
      <h2>Collection Manager</h2>
      <ul>
        {collection.map((item) => (
          <li key={item.id}>
            {item.name} - {item.brand}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Example form for adding items */}
      <button onClick={() => handleSaveItem({ id: '1', name: 'Item 1', brand: 'Brand A', series: '', character: '', type: '', condition: '', tags: '', photo: '' })}>Add Item</button>
    </div>
  );
}

export default CollectionManager;