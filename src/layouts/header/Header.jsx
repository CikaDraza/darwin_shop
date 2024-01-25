import { Link, useNavigate, NavLink } from 'react-router-dom';
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
import { Offcanvas, Stack } from 'react-bootstrap';
import Drawer from '../../components/drawer/Drawer';
import { CartContext } from '../../utils/Store';
import LoginModal from '../../components/login/LoginModal';
import RegisterModal from '../../components/login/RegisterModal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import useMediaQuery from '../../components/useMediaQuery/useMediaQuery';

export default function Header() {
  const { user, setUser, setAlertToastMessage, setShowAlertToast } = useContext(CartContext);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [language, setLanguage] = useState('BE');
  const [currency, setCurrency] = useState('€');
  const [isVisible, setIsVisible] = useState(false);
  const { cart } = useContext(CartContext);
  const [modalShow, setModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const match = useMediaQuery('(max-widht: 768px)');
  let navigate = useNavigate();

  const redirectUser = (path) => {
    navigate(path);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    redirectUser('/');
    setAlertToastMessage('Successfuly logout');
    setShowAlertToast(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      <header className='header'>
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
                    {
                      cart?.items?.length ? cart?.items?.length : ''
                    }        
                    </span>
                  </div>
                  <div className="p-0 mx-auto">
                    <Dropdown>
                      <Dropdown.Toggle className='d-flex border-none' id="dropdown-button" variant="white">
                        <div className="rounded-5 position-relative">
                          <User fill="green" loged={user} />
                        </div>
                      </Dropdown.Toggle>

                      {
                        user ?
                        <Dropdown.Menu>
                          <Dropdown.Item className='px-2' href="#/action-1">
                            my account
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout} className='px-2' href="#/action-2">logout</Dropdown.Item>
                        </Dropdown.Menu>
                        :
                        <Dropdown.Menu>
                          <Dropdown.Item className='px-2' onClick={() => setModalShow(true)}>
                            login
                          </Dropdown.Item>
                          <Dropdown.Item className='px-2' onClick={() => setRegModalShow(true)}>
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
          <Navbar expand="lg" className="bg-body-tertiary d-xl-none">
            <Container fluid>
              <Navbar.Brand href="#">
                <div className="logo">
                  <Link to="/">
                    <DarwinLogo />
                  </Link>
                </div>
              </Navbar.Brand>
              
              <div className="mobile-bottom-header">
                <div className='navbar'>
                  <div>
                    <Button variant="transparent" onClick={handleShow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                      </svg>
                    </Button>
                  </div>
                  <Nav defaultActiveKey="/shop" as="ul">
                    <Stack direction="horizontal" gap={3}>
                      <div className="p-0 mx-auto position-relative">
                        <Drawer />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {
                          cart?.items?.length ? cart?.items?.length : ''
                        }      
                        </span>
                      </div>
                      <div className="p-0 mx-auto">
                        <Dropdown className='relative'>
                          <Dropdown.Toggle className='d-flex border-none' id="dropdown-button" variant="white">
                            <div className="rounded-5 position-relative">
                              <User fill="green" loged={user} />
                            </div>
                          </Dropdown.Toggle>

                          {
                            user ?
                            <Dropdown.Menu className='absolute'>
                              <Dropdown.Item className='px-2' href="#/action-1">
                                my account
                              </Dropdown.Item>
                              <Dropdown.Item onClick={handleLogout} className='px-2' href="#/action-2">logout</Dropdown.Item>
                            </Dropdown.Menu>
                            :
                            <Dropdown.Menu>
                              <Dropdown.Item className='px-2' onClick={() => setModalShow(true)}>
                                login
                              </Dropdown.Item>
                              <Dropdown.Item className='px-2' onClick={() => setRegModalShow(true)}>
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
            </Container>
          </Navbar>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
        <LoginModal setModalShow={setModalShow} modalShow={modalShow} />
        <RegisterModal setRegModalShow={setRegModalShow} regModalShow={regModalShow} />
      </header>
    </>
  );
}
