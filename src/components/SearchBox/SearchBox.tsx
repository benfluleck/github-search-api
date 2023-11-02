import { FC, useState, useEffect } from 'react';

interface SearchBoxProps {
  handleFormChange?: (e: string) => void;
  searchValue?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ handleFormChange, searchValue }) => {
  const [searchInput, setSearchInput] = useState(searchValue);

  useEffect(() => {
    handleFormChange(searchInput);
  }, [searchInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setSearchInput(value);
  };

  return (
    <input
      type="search"
      data-testid="search-input"
      aria-label="Search Github users"
      value={searchInput}
      onChange={handleChange}
      className="outline-none hover:outline-gray-300 focus:outline-gray-300 bg-search-icon text-lg bg-auto bg-left bg-no-repeat pl-12 w-full h-full pr-4 pl-8 rounded z-0 sm:text-ellipsis overflow-hidden"
      placeholder="Search for your favourite github users"
    />
  );
};

export default SearchBox;
