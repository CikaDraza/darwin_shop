import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartSummary from '../../components/cart_summary/CartSummary';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CartSteper from '../../components/cart-steper/CartSteper';

const CartLayout = () => {
  return (
    <div className="custom-container">
      <Container fluid>
        <Row>
          <Col className='pb-5 d-none d-lg-block' xs={12}>
            <CartSteper />
          </Col>
          <Col md={9}>
            <Outlet />
          </Col>
          <Col md={3}>
            <CartSummary />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartLayout;
