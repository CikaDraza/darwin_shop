import React, { useState } from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';

const Autocomplete = ({ suggestions }) => {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const userInput = event.target.value;
    setInput(userInput);
    setFilteredSuggestions(suggestions.filter(item =>
      item.name.toLowerCase().includes(userInput.toLowerCase())
    ));
  };

  return (
    <div className="autocomplete">
      <div className="search-input-container">
        <SearchIcon />
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
        />
      </div>
      <div>
        {input && (
          <div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="autocomplete-dropdown"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
