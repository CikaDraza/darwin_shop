import { Accordion, Alert, Card, Figure, Form, ListGroup, Navbar, Stack } from "react-bootstrap";
import './Payment.scss'
import { useContext } from "react";
import { CartContext } from "../../utils/Store";


function PaymentMethod() {
  const { cart, orders } = useContext(CartContext);

  if(orders.length === 0) {
    return (
      <>
        {[
          'danger',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            Orders are empty, go to order mode
          </Alert>
        ))}
      </>
    )
  }

  return (
    <Accordion className="payment-method" defaultActiveKey={["0"]} alwaysOpen>
      {
        orders?.map((item, index) => {

          return (
            <Accordion.Item key={`${item.productId}-${item.orderMode}`} eventKey={`${index}`}>
              <Accordion.Header>{'Order Mode: '}{item?.orderMode === 'production' ? 'Production Order' : item?.orderMode === 'factory' ? 'Factory Stock' : item?.orderMode === 'floating' ? 'Floating Stock' : item?.orderMode === 'eu' ? 'EU Warehouse' : ''}</Accordion.Header>
              <Accordion.Body className="text-secondary">
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">
                  <Form.Select aria-label="Default select example">
                  <option>PAYMENT TERMS & CREDIT LINE</option>
                  <option value="1">Your Sinesure Credit line</option>
                  <option value="2">Your Darwin Credit line</option>
                  <option value="3">Your Factoring Credit line</option>
                  </Form.Select>
                  </div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">{'Stock: '}{item?.location}</div>
                  <div className="p-2">{'Lead Time: '}{item?.leadTime ? item?.leadTime : '5 days'}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">{'Product: '}{item?.title}{' '}{item?.article}</div>
                  <div className="p-2">{'brand: '}{item?.brand}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">QTY:</div>
                  <div className="p-2"><strong>{item?.quantity}</strong></div>
                  </Stack>
                  <Stack direction="horizontal" gap={3}>
                  <div className="p-2">Price:</div>
                  <div className="p-2"><strong>{item?.price.toFixed(2)}</strong></div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
          )
        })
      }
    </Accordion>
  )
}

export default PaymentMethod;