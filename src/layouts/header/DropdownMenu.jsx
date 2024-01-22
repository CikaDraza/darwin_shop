import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Dropdown.scss';

const DropdownMenu = ({ languageOptions, currencyOptions, onLanguageSelect, onCurrencySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const nodeRef = useRef(null);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    onCurrencySelect(currency);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-button">
        <span>{selectedLanguage}</span>
        <span className='separator'>·</span>
        <span> {selectedCurrency}</span>
      </button>
      <CSSTransition in={isOpen} timeout={200} classNames="dropdown-menu" unmountOnExit nodeRef={nodeRef}>
        <div className="dropdown-content" ref={nodeRef}>
          <div className="dropdown-section">
            {languageOptions.map((language, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleLanguageSelect(language)}>
                {language}
              </div>
            ))}
          </div>
          <div className="dropdown-separator"></div>
          <div className="dropdown-section">
            {currencyOptions?.map((currency, index) => (
              <div key={index} className="dropdown-item" onClick={() => handleCurrencySelect(currency)}>
                {currency}
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
