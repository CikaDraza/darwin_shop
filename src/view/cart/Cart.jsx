import { useContext } from 'react';
import { Alert, CloseButton, Figure, Stack, Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { CartContext } from '../../utils/Store';


function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  if(cart.length === 0) {
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
    <Accordion defaultActiveKey={cart.map((item, index) => index.toString())} alwaysOpen>
      {
        cart?.map((item, index) => (
          <Accordion.Item key={item?._id} eventKey={`${index}`}>
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
                        </td>
                        <td>{item?.brand}</td>
                        <td>{item?.article?.code}{'-'}{item?.article?.nr}{'-'}{item?.article?.series}</td>
                        <td>{item?.price?.euro}{' EUR'}</td>
                        <td>
                          <CloseButton onClick={() => removeFromCart(item._id)} className='my-auto' size="small" />
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