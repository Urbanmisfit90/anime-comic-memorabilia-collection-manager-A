import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/collectionSlice';
import { Item } from '../redux/collectionSlice';

function ItemForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Omit<Item, "_id">>({
        name: '',
        brand: '',
        series: '',
        character: '',
        type: '',
        condition: '',
        tags: '',
        photo: '',
    });
    const [preview, setPreview] = useState<string | null>(null)

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
                setPreview(reader.result as string)
            };
            reader.onerror = () => {
                console.error("Error reading file");
                alert("Error reading file.");
            }
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({...prev, photo: ''}))
            setPreview(null)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addItem({_id: Date.now().toString(), ...formData}))
        setFormData({
            name: '',
            brand: '',
            series: '',
            character: '',
            type: '',
            condition: '',
            tags: '',
            photo: '',
        })
        setPreview(null)
    };

    return (
        <div className="bg-white p-4 shadow rounded">
            <form id="itemForm" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="name" className="border p-2 rounded" placeholder="Item Name" required value={formData.name} onChange={handleChange} />
                    <input type="text" id="brand" className="border p-2 rounded" placeholder="Brand" required value={formData.brand} onChange={handleChange} />
                    <input type="text" id="series" className="border p-2 rounded" placeholder="Series" value={formData.series} onChange={handleChange} />
                    <input type="text" id="character" className="border p-2 rounded" placeholder="Character" value={formData.character} onChange={handleChange} />
                    <select id="type" className="border p-2 rounded" value={formData.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Action Figure">Action Figure</option>
                        <option value="Prop">Prop</option>
                        <option value="Box Set">Box Set</option>
                    </select>
                    <select id="condition" className="border p-2 rounded" value={formData.condition} onChange={handleChange}>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Mint">Mint</option>
                        <option value="Used">Used</option>
                    </select>
                    <input type="text" id="tags" className="border p-2 rounded" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
                    <input type="file" id="photo" className="border p-2 rounded" onChange={handleFileChange} />
                    {preview && <img src={preview} alt="preview" width={100} />}
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Save Item
                </button>
            </form>
        </div>
    );
}

export default ItemForm;
