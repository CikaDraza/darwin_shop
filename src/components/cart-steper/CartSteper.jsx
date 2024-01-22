import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import './CartSteper.scss'
import { useLocation } from 'react-router-dom';

function CartSteper() {
  const location = useLocation();

  const getBadgeColor = (path) => {
    return location.pathname === path ? "danger" : "secondary";
  };

  return (
    <Nav defaultActiveKey="/cart" className='flex-nowrap' as="ul">
      <Nav.Item as="li">
        <Nav.Link className='p-1' href="/cart">
          <div style={{width: '150px'}} className="d-flex flex-wrap justify-content-center">
            <Badge bg={getBadgeColor("/cart")}>1</Badge>
            <span className='w-100 text-center'>Checkout</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <hr className='w-25' />     
      <Nav.Item as="li">
        <Nav.Link className='p-1' href="/cart/delivery-address" eventKey="link-1">
          <div style={{width: '150px'}} className="d-flex flex-wrap justify-content-center">
            <Badge bg={getBadgeColor("/cart/delivery-address")}>2</Badge>
            <span className='w-100 text-center'>Delivery address</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <hr className='w-25' />     
      <Nav.Item as="li">
        <Nav.Link className='p-1' href="/cart/order-mode" eventKey="link-2">
          <div style={{width: '150px'}} className="d-flex flex-wrap justify-content-center">
            <Badge bg={getBadgeColor("/cart/order-mode")}>3</Badge>
            <span className='w-100 text-center'>Order mode</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <hr className='w-25' />
      <Nav.Item as="li">
        <Nav.Link className='p-1' href="/cart/payment-method" eventKey="link-2">
          <div style={{width: '150px'}} className="d-flex flex-wrap justify-content-center">
            <Badge bg={getBadgeColor("/cart/payment-method")}>4</Badge>
            <span className='w-100 text-center'>Payment method</span>
          </div>
        </Nav.Link>
      </Nav.Item>
      <hr className='w-25' />
      <Nav.Item className='flex' as="li">
        <Nav.Link className='p-1' href="/cart/place-order" eventKey="link-2">
          <div style={{width: '150px'}} className="d-flex flex-wrap justify-content-center">
            <Badge bg={getBadgeColor("/cart/place-order")}>5</Badge>
            <span className='w-100 text-center'>Place order</span>
          </div>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default CartSteper;