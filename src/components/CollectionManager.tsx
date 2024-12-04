import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../redux/collectionSlice'; // Correct import
import { addItem, removeItem } from '../redux/collectionSlice';
import { RootState } from '../redux/store';

function CollectionManager() {
  const dispatch = useDispatch();
  const collection = useSelector((state: RootState) => state.collection.items);

  const handleSaveItem = (newItem: Item) => {
    if (newItem.name.trim() === '' || newItem.brand.trim() === '') {
      alert('Name and Brand are required!');
      return;
    }
    dispatch(addItem(newItem));
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem(id));
    }
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
      <button
        onClick={() =>
          handleSaveItem({
            id: Date.now().toString(),
            name: 'Sample Item',
            brand: 'Sample Brand',
            series: 'Sample Series',
            character: 'Sample Character',
            type: 'Action Figure',
            condition: 'New',
            tags: 'sample,collection',
            photo: '',
          })
        }
      >
        Add Sample Item
      </button>
    </div>
  );
}

export default CollectionManager;