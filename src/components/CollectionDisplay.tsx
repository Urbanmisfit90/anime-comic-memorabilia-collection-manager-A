import React from 'react';

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
}

interface CollectionDisplayProps {
  collection: Item[];
  onUpdate: (updatedCollection: Item[]) => void;
  onEdit: (item: Item, index: number) => void;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({ collection, onUpdate, onEdit }) => {
  const handleDelete = (index: number) => {
    const updatedCollection = [...collection];
    updatedCollection.splice(index, 1);
    onUpdate(updatedCollection);
  };

  return (
    <div className="bg-white p-4 shadow rounded w-full">
      <h2 className="text-2xl font-bold mb-4">My Collection</h2>
      {collection.length === 0 ? (
        <p>No items in your collection yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection.map((item, index) => (
            <div key={index} className="border rounded p-2 flex items-start"> {/* Added items-start */}
              <div className="flex-grow mr-4"> {/* Added margin-right */}
                <p className="mb-1"> {/* Added margin-bottom */}
                  <strong>{item.name}</strong> ({item.brand})
                </p>
                {item.series && <p className="mb-1">Series: {item.series}</p>} {/* Added margin-bottom */}
                {item.character && <p className="mb-1">Character: {item.character}</p>} {/* Added margin-bottom */}
                {item.type && <p className="mb-1">Type: {item.type}</p>} {/* Added margin-bottom */}
                {item.condition && <p className="mb-1">Condition: {item.condition}</p>} {/* Added margin-bottom */}
                {item.tags && <p className="mb-1">Tags: {item.tags}</p>} {/* Added margin-bottom */}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => onEdit(item, index)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {item.photo && (
                <img
                  src={item.photo}
                  alt={`${item.name} photo`}
                  className="w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDisplay;