import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import CollectionDisplay from './components/CollectionDisplay';
import Footer from './components/Footer';
import { Item } from './types/item';
import { Container, CssBaseline } from '@mui/material';

const App: React.FC = () => {
    const [collection, setCollection] = useState<Item[]>([]);
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Load collection from localStorage on mount
    useEffect(() => {
        const storedCollectionString = localStorage.getItem("collection");
        
        if (storedCollectionString) {
            try {
                const storedCollection = JSON.parse(storedCollectionString) as Item[];
                setCollection(storedCollection ?? []); // Ensure no null values
            } catch (error) {
                console.error("Error parsing collection from localStorage:", error);
                setCollection([]); // Reset if parsing fails
            }
        }
    }, []);

    // Prevent overwriting localStorage with an empty collection on first render
    useEffect(() => {
        if (collection.length > 0) {
            localStorage.setItem("collection", JSON.stringify(collection));
        }
    }, [collection]);

    const handleCollectionUpdate = (updatedCollection: Item[]) => {
        setCollection(updatedCollection);
        setEditingItem(null);
        setEditIndex(null);
    };

    const handleEdit = (item: Item, index: number) => {
        setEditingItem(item);
        setEditIndex(index);
    };

    return (
        <Container>
            <CssBaseline />
            <Header />
            <main>
                <ItemForm onSave={handleCollectionUpdate} editingItem={editingItem} editIndex={editIndex} />
                
                <CollectionDisplay collection={collection} onUpdate={handleCollectionUpdate} onEdit={handleEdit} />
            </main>
            <Footer />
        </Container>
    );
};

export default App;
