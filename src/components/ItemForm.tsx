import React, { useState, useEffect } from 'react';

interface Item {
  _id?: string;
  name: string;
  brand: string;
  series?: string;
  character?: string;
  type?: string;
  condition?: string;
  tags?: string;
  photo?: string | null;
  edition?: string;
}

interface ItemFormProps {
  onSave: (updatedCollection: Item[]) => void;
  editingItem: Item | null;
  editIndex: number | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave, editingItem, editIndex }) => {
  const [collection, setCollection] = useState<Item[]>(() => {
    const storedCollection = localStorage.getItem('collection');
    return storedCollection ? JSON.parse(storedCollection) : [];
  });

  const [item, setItem] = useState<Item>({
    name: '',
    brand: '',
    series: '',
    character: '',
    type: '',
    condition: '',
    tags: '',
    photo: null,
    edition: '',
  });

  useEffect(() => {
    if (editingItem) {
      setItem({ ...editingItem });
    } else {
      setItem({
        name: '',
        brand: '',
        series: '',
        character: '',
        type: '',
        condition: '',
        tags: '',
        photo: null,
        edition: '',
      });
    }
  }, [editingItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setItem({ ...item, [id]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setItem({ ...item, photo: reader.result as string });
      reader.readAsDataURL(file);
    } else {
      setItem({ ...item, photo: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: Item = { ...item };

    let updatedCollection: Item[];

    if (editIndex !== null) {
      updatedCollection = [...collection];
      updatedCollection[editIndex] = newItem;
    } else {
      updatedCollection = [...collection, newItem];
    }

    setCollection(updatedCollection);
    localStorage.setItem('collection', JSON.stringify(updatedCollection)); // Save all fields to local storage
    onSave(updatedCollection);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            id="name"
            className="border p-2 rounded"
            placeholder="Item Name"
            required
            value={item.name}
            onChange={handleChange}
          />
          <input
            type="text"
            id="brand"
            className="border p-2 rounded"
            placeholder="Brand"
            required
            value={item.brand}
            onChange={handleChange}
          />
          <input
            type="text"
            id="series"
            className="border p-2 rounded"
            placeholder="Series"
            value={item.series}
            onChange={handleChange}
          />
          <input
            type="text"
            id="character"
            className="border p-2 rounded"
            placeholder="Character"
            value={item.character}
            onChange={handleChange}
          />
          <select
            id="type"
            className="border p-2 rounded"
            value={item.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Action Figure">Action Figure</option>
            <option value="Prop">Prop</option>
            <option value="Box Set">Box Set</option>
          </select>
          <select
            id="condition"
            className="border p-2 rounded"
            value={item.condition}
            onChange={handleChange}
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Mint">Mint</option>
            <option value="Used">Used</option>
          </select>
          {/* Moved Edition dropdown here */}
          <select
            id="edition"
            className="border p-2 rounded"
            value={item.edition || ''}
            onChange={handleChange}
          >
            <option value="">Select Edition</option>
            <option value="Standard Edition">Standard Edition</option>
            <option value="Deluxe Edition">Deluxe Edition</option>
            <option value="Collector's Edition">Collector's Edition</option>
            <option value="Special Edition">Special Edition</option>
          </select>
          {/* Tags input */}
          <input
            type="text"
            id="tags"
            className="border p-2 rounded"
            placeholder="Tags"
            value={item.tags || ''}
            onChange={handleChange}
          />
          {/* File input (moved last) */}
          <input
            type="file"
            id="photo"
            className="border p-2 rounded"
            onChange={handleFileChange}
          />
          {item.photo && <img src={item.photo} alt="preview" width={100} />}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Save Item
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
