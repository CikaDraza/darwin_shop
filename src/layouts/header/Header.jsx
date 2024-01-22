import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import productData from '../../assets/data/products.json';
import './Header.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import Autocomplete from '../../components/autocomplete/Autocomplete';
import DropdownMenu from './DropdownMenu';
import DarwinLogo from '../../assets/icons/DarwinLogo';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import User from '../../assets/icons/User';
import { Stack } from 'react-bootstrap';
import Drawer from '../../components/drawer/Drawer';
import { CartContext } from '../../utils/Store';
import LoginModal from '../../components/login/LoginModal';
import RegisterModal from '../../components/login/RegisterModal';

export default function Header() {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [language, setLanguage] = useState('BE');
  const [currency, setCurrency] = useState('€');
  const [isVisible, setIsVisible] = useState(false);
  const { cart } = useContext(CartContext);
  const [modalShow, setModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);

  const handleMouseEnter = () => {
    setShowProductsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowProductsDropdown(false);
  };

  function toggleVisibility() {
    const visibleBtn = window.scrollY;
    visibleBtn > 50 ? setIsVisible(() => true) : setIsVisible(() => false);
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <header className={isVisible ? 'header sticky-top bg-white shadow' : 'header'}>
      <div className='custom-container'>
        <div className="top-header">
          <div className="logo">
            <Link to="/">
              <DarwinLogo />
            </Link>
          </div>
          <div className='navigation'>
            <nav className="nav-links">
              <NavLink to="/support" className="nav-link">Support</NavLink>
              <NavLink to="/" className="nav-link">Shopping</NavLink>
            </nav>
            <div className="search-bar">
              <Autocomplete suggestions={productData}/>
            </div>
            <div className="selectors">
            <DropdownMenu
              languageOptions={['BE', 'FR', 'NL', 'US']}
              currencyOptions={['€', '$']}
              onLanguageSelect={setLanguage}
              onCurrencySelect={setCurrency}
            />
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <div className="logo"></div>
          <div className='navbar'>
            <nav className="bottom-nav">
              <NavLink onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave} to="#products" className="bottom-nav-link">PRODUCTS</NavLink>
                
              <NavLink to="#engineering" className="bottom-nav-link">ENGINEERING</NavLink>
              <NavLink to="#it" className="bottom-nav-link">IT</NavLink>
              <NavLink to="#financing" className="bottom-nav-link">FINANCING</NavLink>
              <NavLink to="#community" className="bottom-nav-link">COMMUNITY</NavLink>
              <CSSTransition
                in={showProductsDropdown}
                timeout={600}
                classNames="dropdown"
                unmountOnExit
                nodeRef={dropdownRef}
                >
                <div onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} ref={dropdownRef} className={showProductsDropdown ? "drop-menu" : "drop-menu hidden"}>
                  <ul>
                    {
                      productData.map(item => (
                        <li style={{ '--hover-color': item.color }} key={item.id}>{item.name}</li>
                      ))
                    }
                  </ul>
                </div>
              </CSSTransition>
            </nav>
            <Nav defaultActiveKey="/shop" as="ul">
              <Stack direction="horizontal" gap={3}>
                <div className="p-0 mx-auto position-relative">
                  <Drawer />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length > 0 ? cart.length : ''}        
                  </span>
                </div>
                <div className="p-0 mx-auto">
                  <Dropdown>
                    <Dropdown.Toggle className='d-flex border-none' id="dropdown-button" variant="white">
                      <div className="rounded-5 position-relative">
                        <User fill="green" loged={false} />
                        
                      </div>
                    </Dropdown.Toggle>

                    {
                      !productData ?
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          my account
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">logout</Dropdown.Item>
                      </Dropdown.Menu>
                      :
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setModalShow(true)}>
                          login
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setRegModalShow(true)}>
                          register
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    }

                  </Dropdown>
                </div>
              </Stack>
            </Nav>
          </div>
        </div>
      </div>
      <LoginModal setModalShow={setModalShow} modalShow={modalShow} />
      <RegisterModal setRegModalShow={setRegModalShow} regModalShow={regModalShow} />
    </header>
  );
}
