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
    onSave: (item: Item[]) => void;
    editingItem: Item | null;
    editIndex: number | null;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave, editingItem, editIndex }) => {
    const [item, setItem] = useState<Omit<Item, 'photo' | 'series' | 'character' | 'type' | 'condition' | 'tags' | 'edition'>>({
        name: '',
        brand: '',
    });
    const [photo, setPhoto] = useState<string | null>(null);
    const [series, setSeries] = useState<string>('');
    const [character, setCharacter] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [condition, setCondition] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [edition, setEdition] = useState<string>('');

    useEffect(() => {
        if (editingItem) {
            setItem({ name: editingItem.name, brand: editingItem.brand });
            setPhoto(editingItem.photo || null);
            setSeries(editingItem.series || '');
            setCharacter(editingItem.character || '');
            setType(editingItem.type || '');
            setCondition(editingItem.condition || '');
            setTags(editingItem.tags || '');
            setEdition(editingItem.edition || '');
        } else {
            setItem({ name: '', brand: '' });
            setPhoto(null);
            setSeries('');
            setCharacter('');
            setType('');
            setCondition('');
            setTags('');
            setEdition('');
        }
    }, [editingItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === 'name' || id === 'brand') {
            setItem({ ...item, [id]: value });
        } else if (id === 'series') {
            setSeries(value);
        } else if (id === 'character') {
            setCharacter(value);
        } else if (id === 'type') {
            setType(value);
        } else if (id === 'condition') {
            setCondition(value);
        } else if (id === 'tags') {
            setTags(value);
        } else if (id === 'edition') {
            setEdition(value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPhoto(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const collection = JSON.parse(localStorage.getItem("collection") || "[]") as Item[];

        const newItem = { ...item, photo, series, character, type, condition, tags, edition };

        if (editIndex !== null) {
            collection[editIndex] = newItem;
        } else {
            collection.push(newItem);
        }
        onSave(collection);
    };

    return (
        <div className="bg-white p-4 shadow rounded">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="name" className="border p-2 rounded" placeholder="Item Name" required value={item.name} onChange={handleChange} />
                    <input type="text" id="brand" className="border p-2 rounded" placeholder="Brand" required value={item.brand} onChange={handleChange} />
                    <input type="text" id="series" className="border p-2 rounded" placeholder="Series" value={series} onChange={handleChange} />
                    <input type="text" id="character" className="border p-2 rounded" placeholder="Character" value={character} onChange={handleChange} />
                    <select id="type" className="border p-2 rounded" value={type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Action Figure">Action Figure</option>
                        <option value="Prop">Prop</option>
                        <option value="Box Set">Box Set</option>
                    </select>
                    <select id="condition" className="border p-2 rounded" value={condition} onChange={handleChange}>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Mint">Mint</option>
                        <option value="Used">Used</option>
                    </select>
                    <select id="edition" className="border p-2 rounded" value={edition} onChange={handleChange}>
                        <option value="">Select Edition</option>
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Collectors">Collectors</option>
                    </select>
                    <input type="text" id="tags" className="border p-2 rounded" placeholder="Tags (comma-separated)" value={tags} onChange={handleChange} />
                    <input type="file" id="photo" className="border p-2 rounded" onChange={handleFileChange} />
                    {photo && <img src={photo} alt="preview" width={100} />}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Save Item</button>
            </form>
        </div>
    );
};

export default ItemForm;
