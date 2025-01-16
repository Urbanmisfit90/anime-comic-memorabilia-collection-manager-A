function Filters() {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>
            <select id="filterType" className="border p-2 rounded">
                <option value="">Filter by Type</option>
                <option value="Action Figure">Action Figure</option>
                <option value="Prop">Prop</option>
                <option value="Box Set">Box Set</option>
            </select>
            <button id="clearFilters" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                Clear Filters
            </button>
        </div>
    );
}

export default Filters;
