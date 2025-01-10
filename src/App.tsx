import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, setItems } from './redux/collectionSlice';
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

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/items');
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                dispatch(setItems(data));
            } catch (error) {
                console.error("Error fetching items:", error);
                alert("Error fetching items. Please check the console.");
            }
        };

        fetchItems();
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, photo: reader.result as string }));
            };
            reader.onerror = () => {
                console.error("Error reading file");
                alert("Error reading file.");
            }
            reader.readAsDataURL(file);
        }
    };

    const handleSaveItem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.brand) {
            alert('Name and Brand are required!');
            return;
        }

        console.log('Data to be sent:', formData); // Log before fetch

        try {
            const response = await fetch('/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Try to parse error message from the backend
                throw new Error(`HTTP error ${response.status}: ${errorData?.message || response.statusText}`);
            }

            const savedItem = await response.json();
            console.log('Response from server:', savedItem); // Log after fetch
            dispatch(addItem(savedItem));

            setFormData({ // Clear the form
                name: '',
                brand: '',
                series: '',
                character: '',
                type: '',
                condition: '',
                tags: '',
                photo: '',
            });
        } catch (error) {
            console.error('Error saving item:', error);
            alert('Error saving item. Please check the console.');
        }
    };

    const handleDeleteItem = async (id: string) => {
        try {
            const response = await fetch(`/items/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
            }
            dispatch(removeItem(id));
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Error deleting item. Please check the console.");
        }
    };
    console.log("here")

    React.useEffect(() => {
      console.log('here')
      fetch('localhost:5000')
          .then(res => console.log(res))
          .catch(err => console.log(err))
  }, [])

    return (
        <div>
            <h1>Collection App</h1>
            <form onSubmit={handleSaveItem}>
                <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" id="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required />
                <input type="text" id="series" value={formData.series} onChange={handleChange} placeholder="Series" />
                <input type="text" id="character" value={formData.character} onChange={handleChange} placeholder="Character" />
                <select id="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Action Figure">Action Figure</option>
                    <option value="Prop">Prop</option>
                    <option value="Box Set">Box Set</option>
                </select>
                <select id="condition" value={formData.condition} onChange={handleChange}>
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Mint">Mint</option>
                    <option value="Used">Used</option>
                </select>
                <input type="text" id="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" />
                <input type="file" id="photo" onChange={handleFileChange} />
                <button type="submit">Save Item</button>
            </form>

            <h2>My Collection</h2>
            <ul>
                {collection.map((item) => (
                    <li key={item._id}>
                        <div>
                            {item.photo && <img src={item.photo} alt={`${item.name} photo`} width="100" />}
                            <p>
                                <strong>{item.name}</strong> ({item.brand})
                            </p>
                        </div>
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;