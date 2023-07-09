import React, { ChangeEvent, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../ts/states/useAuth';

interface AutocompleteItem {
  id: number;
  name: string;
  // Add additional properties as needed
}

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {is_authenticated} = useAuth()
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowAutocomplete(false);
  };

  const autoCompleteQuery = useQuery<AutocompleteItem[]>('autocomplete', async () => {
    const searchText = inputRef.current!.value;
    if (searchText) {
      const response: AxiosResponse<AutocompleteItem[]> = await axios.post('/quiz/autocomplete', { name: searchText });
      return response.data;
    }
    return [];
  }, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  function autoComplete() {
    const searchText = inputRef.current!.value;
    console.log(searchText);
    
    if (searchText !== '') {
      autoCompleteQuery.refetch();
    }
    setShowAutocomplete(searchText !== '');
  }

  function search() {
    const searchText = inputRef.current!.value.trim();
    if (searchText !== '') {
      console.log(searchText);
      inputRef.current!.value = '';
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      search();
    }
  }

  return (
    <>{ (is_authenticated !== undefined) &&
        <div className="flex justify-end mb-4 mr-4 items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className={`p-2 rounded border border-gray-300 outline-none ${
              isFocused ? 'shadow-outline' : ''
            }`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={autoComplete}
            onKeyDown={handleKeyDown}
          />
          <div onClick={search} className="cursor-pointer bg-blue-500 text-white p-2 rounded ml-1">
            <AiOutlineSearch size={24} className="text-white" />
          </div>
          {showAutocomplete && autoCompleteQuery.isLoading && <div>Loading...</div>}
          {showAutocomplete && autoCompleteQuery.isSuccess && autoCompleteQuery.data && (
            <ul className=' absolute bg-white shadow rounded-b p-2 '>
              {autoCompleteQuery.data.map((item: AutocompleteItem) => (
                <li className=' cursor-pointer p-1' key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
      </div>}
    </>
  );
};

export default SearchBar;
