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
  edition?: string;
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
    <div className="bg-white p-4 shadow rounded w-full min-h-[200px]">
      <h2 className="text-2xl font-bold mb-4">My Collection</h2>
      {collection.length === 0 ? (
        <p className="text-center text-gray-500">No items in your collection yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {collection.map((item, index) => (
            <div key={index} className="border rounded p-4 flex flex-col md:flex-row items-start gap-4 relative">
              <div className="flex-grow">
                <p className="mb-1">
                  <strong>{item.name}</strong>
                </p>
                <p className="mb-1">Brand: {item.brand}</p>
                {item.series && <p className="mb-1">Series: {item.series}</p>}
                {item.character && <p className="mb-1">Character: {item.character}</p>}
                {item.type && <p className="mb-1">Type: {item.type}</p>}
                {item.condition && <p className="mb-1">Condition: {item.condition}</p>}
                {item.edition && <p className="mb-1">Edition: {item.edition}</p>}
                {item.tags && <p className="mb-1">Tags: {item.tags}</p>}
                <div className="flex gap-4 mt-4">
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
                <div className="md:w-64 rounded mt-4 md:mt-0"> {/* Increased width */}
  <img 
    src={item.photo} 
    alt={`${item.name} photo`} 
    className="object-contain w-full h-full" 
  />
</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionDisplay;