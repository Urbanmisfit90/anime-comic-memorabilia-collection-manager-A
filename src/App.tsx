import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/collectionSlice';
import { RootState } from './redux/store';

function App() {
  const dispatch = useDispatch();
  const collection = useSelector((state: RootState) => state.collection.items);

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    series: '',
    character: '',
    type: '',
    condition: '',
    tags: '',
    photo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand) {
      alert('Name and Brand are required!');
      return;
    }
    dispatch(addItem({ ...formData, id: Date.now().toString() }));
    setFormData({
      name: '',
      brand: '',
      series: '',
      character: '',
      type: '',
      condition: '',
      tags: '',
      photo: '',
    });
  };

  return (
    <div>
      <h1>Collection App</h1>
      <form onSubmit={handleSaveItem}>
        <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" id="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />
        <input type="file" id="photo" onChange={handleFileChange} />
        <button type="submit">Save Item</button>
      </form>
      <h2>My Collection</h2>
      <ul>
        {collection.map((item) => (
          <li key={item.id}>
            <div>
              {item.photo && <img src={item.photo} alt={`${item.name} photo`} width="100" />}
              <p>
                <strong>{item.name}</strong> ({item.brand})
              </p>
            </div>
            <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;