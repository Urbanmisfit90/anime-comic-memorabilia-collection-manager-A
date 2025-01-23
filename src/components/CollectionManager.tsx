import { useSelector, useDispatch } from 'react-redux';
import { Item } from '../redux/collectionSlice';
import { addItem } from '../redux/collectionSlice';
import { removeItem } from '../redux/collectionSlice';
import { RootState } from '../redux/store';
import React from 'react'; // spider-man-spider-punk-suit_marvel_gallery_64b1b3218759d

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

    const handleRemoveItem = (_id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(removeItem(_id));
        }
    };

    return (
        <div>
            <h2>Collection Manager</h2>
            <ul>
                {collection.map((item) => (
                    <li key={item._id}>
                        {item.name} - {item.brand}
                        <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() =>
                    handleSaveItem({
                        _id: Date.now().toString(), // Temporary _id
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
