import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/collectionSlice';
import { RootState } from './redux/store';
import { Item } from './redux/collectionSlice';  // Correct import of Item

function App() {
  const dispatch = useDispatch();
  const collection = useSelector((state: RootState) => state.collection.items);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [series, setSeries] = useState('');
  const [character, setCharacter] = useState('');
  const [type, setType] = useState('');
  const [condition, setCondition] = useState('');
  const [tags, setTags] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: Item = {  // Use Item type here
      id: Date.now().toString(),
      name,
      brand,
      series,
      character,
      type,
      condition,
      tags,
      photo,
    };

    dispatch(addItem(newItem));

    setName('');
    setBrand('');
    setSeries('');
    setCharacter('');
    setType('');
    setCondition('');
    setTags('');
    setPhoto('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-600">Collection Manager</h1>

      <form onSubmit={handleSaveItem}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          required
        />
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
          required
        />
        {/* Other form inputs go here */}

        <button type="submit">Save Item</button>
      </form>

      <div>
        <h2>My Collection</h2>
        <ul>
          {collection.map((item) => (
            <li key={item.id}>
              {item.name} - {item.brand}
              <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;