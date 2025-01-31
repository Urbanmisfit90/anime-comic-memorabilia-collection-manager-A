import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import CollectionDisplay from './components/CollectionDisplay';
import Footer from './components/Footer';
import { Item } from './types/item'; // Import Item type from a dedicated file

const App: React.FC = () => {
    const [collection, setCollection] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        const storedCollection = JSON.parse(localStorage.getItem("collection") || "[]") as Item[];
        setCollection(storedCollection);
    }, []);

    const handleCollectionUpdate = (updatedCollection: Item[]) => {
        setCollection(updatedCollection);
        localStorage.setItem("collection", JSON.stringify(updatedCollection));
        setEditingItem(null);
        setEditIndex(null);
    };

    const handleEdit = (item: Item, index: number) => {
        setEditingItem(item);
        setEditIndex(index);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Header />
            <main className="flex flex-col items-center space-y-4">
                <ItemForm onSave={handleCollectionUpdate} editingItem={editingItem} editIndex={editIndex} />
                <CollectionDisplay collection={collection} onUpdate={handleCollectionUpdate} onEdit={handleEdit} />
            </main>
            <Footer />
        </div>
    );
};

export default App;
