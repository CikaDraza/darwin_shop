import { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Cart from '../../assets/icons/Cart';
import './Drawer.scss';
import { CartContext } from '../../utils/Store';
import { Alert, Figure, ListGroup } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import ActionButton from '../action_button/ActionButton';
import { useNavigate } from 'react-router-dom';

function OffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { cart, removeFromCart, user, setAlertToastMessage, setShowAlertToast } = useContext(CartContext);

  let navigate = useNavigate();

  const redirectUser = (path) => {
    navigate(path);
  }

  const handleCartPage = () => {
    if (user) {
      redirectUser('/cart');
    } else {
      setAlertToastMessage('Please login first to continue shopping');
      setShowAlertToast(true);
      redirectUser('/');
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow} className="drawer rounded-5 position-relative">
        <Cart fill="#444" />
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {
          cart?.length === 0 &&
          <>
            {[
              'danger',
            ].map((variant) => (
              <Alert key={variant} variant={variant}>
                cart is empty, go to shop
              </Alert>
            ))}
          </>
        }
        <ListGroup as="ol" numbered>
          {
            cart?.map(item => (
              <ListGroup.Item
                key={item._id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {item.brand}
                    <Figure className='d-flex'>
                      <Figure.Image
                        width={50}
                        height="auto"
                        alt={item?.title}
                        src={item?.images[0].image}
                      />
                      <Figure.Caption className='mx-3'>
                        {item.title}
                      </Figure.Caption>
                    </Figure>
                  </div>
                </div>
                <CloseButton onClick={() => removeFromCart(item._id)} className='my-auto' size="small" />
              </ListGroup.Item>
            ))
          }
        </ListGroup>
        </Offcanvas.Body>
        {
          cart?.length !== 0 &&
          <div className='mb-3 p-3'>
            <div onClick={handleCartPage}>
              <ActionButton href={'/cart'} text={'CHECKOUT'} cancelBtn={false} positon={'full'} color={'text-light'} isFetchBtn={false} bgVariant={false} />
            </div>
          </div>
        }
      </Offcanvas>
    </>
  );
}

export default function Drawer() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvas key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}