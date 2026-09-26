const Search = ({ searchTerm, handleSearchChange, pagination, users }) => {
  return (
    <div className="mb-4 flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md outline-none  focus:ring focus:ring-yellow-400"
      />
      <span className="text-sm text-gray-500">
        Total: {pagination.total || users.length} users
      </span>
    </div>
  );
};

export default Search;
