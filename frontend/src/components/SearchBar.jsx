import React, { useState } from "react";
import { Search } from "lucide-react"; // Importing Search icon from Lucide
import { useContentStore } from "../store/content";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setContentType } = useContentStore();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass search value to parent component
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for movies, shows..."
        className="w-full bg-gray-900 text-white rounded-full py-2 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
      />
    </div>
  );
};

export default SearchBar;
