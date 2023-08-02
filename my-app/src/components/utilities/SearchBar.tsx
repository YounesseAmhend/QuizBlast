import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useAuth } from '../ts/states/useAuth';
import { useUser } from '../ts/states/userStates';
import { useDisplay } from '../ts/states/useDisplay';
import { truncateTitle } from '../ts/staticFunctions';

interface AutocompleteItem {
  id: number;
  name: string;
  // Add additional properties as needed
}

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {is_authenticated} = useAuth();
  const { setId } = useUser()
  const { setDisplay } = useDisplay()
  const autoCompleteList = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const hideAutocomplete = () => {
    setIsFocused(false);
    setShowAutocomplete(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autoCompleteList.current && !autoCompleteList.current.contains(event.target as Node)) {
        hideAutocomplete()
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
  function displayQuiz(id: number){
    console.log("clicked: ", id)
    setId(id)
    setDisplay("view_quiz")
  }

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
      <div className='mb-4 mr-4'>
        <div className="flex justify-center items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            size={44}
            className={` p-2 rounded-xl border border-gray-300 outline-none max-[600px]:w-9/12 ${
              isFocused ? 'shadow-outline' : ''
            }`}
            onFocus={handleFocus}
            onChange={autoComplete}
            onKeyDown={handleKeyDown}
          />
          <div onClick={search} className="cursor-pointer bg-blue-500 hover:bg-blue-600 transform duration-200 ease-in-out text-white p-2 rounded-xl ml-2 ">
            <AiOutlineSearch size={24} className="text-white" />
          </div>
        </div>
          <div ref={autoCompleteList} className='flex justify-center'>
            <div className=' w-4/12 mr-5 max-[600px]:w-10/12'>
            {showAutocomplete && autoCompleteQuery.isLoading && 
              <div className='bg-white shadow mt-1 rounded-xl p-2 flex justify-center self-center absolute z-10 w-4/12 max-[600px]:w-10/12'>
                Loading...
              </div>
            }
            {showAutocomplete && autoCompleteQuery.isSuccess && autoCompleteQuery.data && (
              <ul className='bg-white shadow mt-1 rounded-xl p-2 absolute z-10 w-4/12 max-[600px]:w-10/12'>
                {autoCompleteQuery.data.map((item: AutocompleteItem) => (
                  <div onClick={()=>{displayQuiz(item.id)}} className=' cursor-pointer p-1 hover:text-blue-400 transform duration-100 ease-in-out' key={item.id}>{truncateTitle(item.name)}</div>
                ))}
                {autoCompleteQuery.data.length === 0 && <li>Nothing found.</li> }
              </ul>
            )}
            </div>
          </div>
      </div>}
    </>
  );
};

export default SearchBar;
