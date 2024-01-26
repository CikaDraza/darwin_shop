import { useContext } from 'react';
import { Alert, CloseButton, Figure, Stack, Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { CartContext } from '../../utils/Store';
import useMediaQuery from '../../components/useMediaQuery/useMediaQuery';


function Cart() {
  const { user, cart, removeFromCart } = useContext(CartContext);
  const match = useMediaQuery('(max-width: 768px)');
  const cartItems = user?._id ? (cart[0]?.items || []) : (cart?.items || []);

  if(cartItems?.length === 0) {
    return (
      <>
        {[
          'danger',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            Cart is empty, go to shop
          </Alert>
        ))}
      </>
    )
  }

  return (
    <Accordion defaultActiveKey={cartItems?.map((item, index) => index.toString())} alwaysOpen>
      {
        cartItems?.map((item, index) => (
          <Accordion.Item key={item?.productId} eventKey={`${index}`}>
            <Accordion.Header>{item?.brand}</Accordion.Header>
            <Accordion.Body className='text-dark'>
              <Stack gap={3}>
                <div className="p-2">
                  <Table responsive="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Acrtical Code</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Figure style={{width: match ? '200px' : 'auto'}} className='d-flex'>
                            <Figure.Image
                              width={50}
                              height="auto"
                              alt={item?.title}
                              src={item?.productImage}
                            />
                            <Figure.Caption className='mx-3'>
                              {item.title}
                            </Figure.Caption>
                          </Figure>
                        </td>
                        <td>
                          <div style={{width: match ? '80px' : 'auto'}}>
                            {item?.brand}
                          </div>
                        </td>
                        <td>
                          <div style={{width: match ? '200px' : 'auto'}}>
                            {item?.articleCode}
                          </div>
                        </td>
                        <td>
                          <div style={{width: match ? '100px' : 'auto'}}>
                            {item?.price?.euro}{' EUR'}
                          </div>
                        </td>
                        <td>
                          <CloseButton onClick={() => removeFromCart(item.productId)} className='my-auto' size="small" />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Stack>
            </Accordion.Body>
          </Accordion.Item>
        ))
      }
    </Accordion>
  );
}

export default Cart;