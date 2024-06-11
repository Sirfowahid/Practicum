import React,{useState} from 'react'
import { FaSearch } from 'react-icons/fa';
interface Props {
    placeholder?: string;
    onSearch: (query: string) => void;
  }
const SearchBar = ({ placeholder = 'Search...', onSearch }:Props) => {

    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(query);
    };
  return (
    <div className="flex items-center border rounded-lg p-2 shadow-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-grow p-2 text-black outline-none"
      />
      <button onClick={handleSearch} className="p-2">
        <FaSearch className="text-primary bg-secondary" />
      </button>
    </div>
  )
}

export default SearchBar