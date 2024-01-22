import { ListGroup, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ActionButton from '../action_button/ActionButton';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../utils/Store';
import { useLocation, useNavigate } from 'react-router-dom';

function CartSummary() {
  const { orders } = useContext(CartContext);
  const numbers = orders?.map(item => item.price)
  const subTotal = numbers?.reduce((a, c) => a + c, 0);
  const location = useLocation();
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const currentPath = location.pathname;
    setCurrentStep(currentPath);
  }, [location]);



  return (
    <Card className='shadow border-0 d-flex'>
       <Card.Header>
        <Card.Title>SUMMARY</Card.Title>
       </Card.Header>
      <Card.Body className='d-block'>
        <ListGroup>
          <ListGroup.Item>
            <Stack direction="horizontal" className='justify-content-between'>
              <Card.Subtitle className="p-2 text-muted">Subtotal</Card.Subtitle>
              <div className="p-2">{orders && subTotal.toFixed(2)}{' EUR'}</div>
            </Stack>
            <Stack direction="horizontal" className='justify-content-between'>
              <Card.Subtitle className="p-2 text-muted">Discount</Card.Subtitle>
              <div className="p-2">_</div>
            </Stack>
            <Stack direction="horizontal" className='justify-content-between'>
              <Card.Subtitle className="p-2 text-muted">Shipping</Card.Subtitle>
              <div className="p-2">_</div>
            </Stack>
            <Stack direction="horizontal" className='justify-content-between'>
              <Card.Subtitle className="p-2 text-muted">Tax</Card.Subtitle>
              <div className="p-2">_</div>
            </Stack>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Stack direction="horizontal" className='justify-content-between'>
            <Card.Subtitle className="p-2 text-muted">TOTAL</Card.Subtitle>
            <div className="p-2">{orders && subTotal.toFixed(2)}{' EUR'}</div>
          </Stack>
        </ListGroup.Item>
      </ListGroup>
      <footer className='py-3 px-3'>
        {
          currentStep === '/cart' &&
          <ActionButton color="text-white" href="/cart/delivery-address" text={'proceed to delivery'} />
        }
        {
          currentStep === '/cart/delivery-address' &&
          <ActionButton cancelBtn={true} color="text-white" href="/cart/order-mode" text={'proceed to delivery'} text_cancel={'back'} href_back={'/cart'} color_cancel="text-danger" />
        }
        {
          currentStep === '/cart/order-mode' &&
          <ActionButton cancelBtn={true} color="text-white" href="/cart/payment-method" text={'go to payment method'} text_cancel={'back'} href_back={'/cart/delivery-address'} color_cancel="text-danger" />
        }
        {
          currentStep === '/cart/payment-method' &&
          <ActionButton cancelBtn={true} color="text-white" href="/cart/payment-method" text={'go to place order'} text_cancel={'back'} href_back={'/cart/order-mode'} color_cancel="text-danger" />
        }
      </footer>
    </Card>
  );
}

export default CartSummary;