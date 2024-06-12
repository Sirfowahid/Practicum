import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DateInput from './DateInput';

interface Props {
  onSearch: (fromDate: string, toDate: string) => void;
}

const SearchBarDate = ({ onSearch }: Props) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleSearch = () => {
    onSearch(fromDate, toDate);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center rounded-lg px-4 md:mx-6 py-2 shadow-lg bg-white space-y-4 md:space-y-0 max-w-[900px] mx-12">
      <div className="flex-grow md:w-auto">
        <DateInput label="From" value={fromDate} onChange={handleFromDateChange} />
      </div>
      <div className="flex-grow md:w-auto">
        <DateInput label="To" value={toDate} onChange={handleToDateChange} />
      </div>
      <button 
        onClick={handleSearch} 
        className="p-2 md:p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200 flex items-center"
      >
        <FaSearch className="w-5 h-5 md:w-6 md:h-6 mr-1" />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBarDate;
