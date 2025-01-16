import React from 'react';
import { Item } from '../redux/collectionSlice';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/collectionSlice';

interface CollectionListProps {
    items: Item[];
}

const CollectionList: React.FC<CollectionListProps> = ({ items }) => {
    const dispatch = useDispatch()

    const handleDeleteItem = (_id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(removeItem(_id));
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">My Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item._id} className='border rounded p-2'>
                        {item.photo && <img src={item.photo} alt={`${item.name} photo`} width="100" />}
                        <p>
                            <strong>{item.name}</strong> ({item.brand})
                        </p>
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionList;

