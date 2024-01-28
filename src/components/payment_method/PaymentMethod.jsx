import { Accordion, Alert, Card, Figure, Form, ListGroup, Navbar, Stack } from "react-bootstrap";
import './Payment.scss'
import { useContext, useState } from "react";
import { CartContext } from "../../utils/Store";
import useMediaQuery from "../useMediaQuery/useMediaQuery";


function PaymentMethod() {
  const { orders } = useContext(CartContext);
  const match = useMediaQuery('(max-width: 768px)');
  const [value, setValue] = useState('Your Darwin Credit line');
  const [advanceForCredit, setAdvanceForCredit] = useState([
    '2%', '1%', '3%'
  ]);
  const [advanceForOrder, setAdvanceForOrder] = useState(['2%', '3%', '2%']);
  const [indexValue, setIndexValue] = useState(1);

  const handleChange = (event) => {
    setValue(event.target.value);
    setIndexValue(event.target.id - 1)
    console.log();
  };

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
    <>
    <div className="payment-terms">
      <Stack className="p-3" gap={3}>
        <header><strong>PAYMENT TERMS & CREDIT LINE</strong></header>
        <Accordion className="payment-method" defaultActiveKey="100" alwaysOpen>
          <Accordion.Item eventKey="100">
            <Accordion.Header className="payment-method__credit">
              <strong>{value}</strong>
            </Accordion.Header>
            <Accordion.Body>
              <Stack direction="horizontal" gap={3}>
                <div className="p-2">
                  <Form onChange={handleChange}>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          label="Your Sinesure Credit line"
                          value="Your Sinesure Credit line"
                          name="group1"
                          type={type}
                          id={1}
                        />
                        <Form.Check
                          label="Your Darwin Credit line"
                          value="Your Darwin Credit line"
                          name="group1"
                          type={type}
                          id={2}
                        />
                        <Form.Check
                          label="Your Factoring Credit line"
                          value="Your Factoring Credit line"
                          name="group1"
                          type={type}
                          id={3}
                        />
                      </div>
                    ))}
                  </Form>
                </div>
              </Stack>
              <Stack className="payment-method__methods rounded-3 py-2" direction="horizontal" gap={3}>
                <div className={match ? "p-2 mx-0" : "py-2 px-3 d-flex justify-content-between align-items-center w-100"}>
                  <span>Cash in Advance</span><span className="text-right fs-4">{advanceForCredit[indexValue]}</span>
                </div>
                <div className={match ? "d-none" : "vr mx-auto"} />
                <div className={match ? "p-2 mx-0" : "py-2 px-3 d-flex justify-content-between align-items-center w-100"}>
                  <span>Cash with Order</span><span className="text-right fs-4">{advanceForOrder[indexValue]}</span>
                </div>
              </Stack>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </div>
    
    <Accordion className="payment-method" defaultActiveKey={["0"]} alwaysOpen>
      {
        orders?.map((item, index) => {
          return (
            <Accordion.Item key={`${item.productId}-${item.orderMode}`} eventKey={`${index}`}>
              <Accordion.Header><strong>{item.title}</strong></Accordion.Header>
              <Accordion.Body className="text-secondary">
                <div className="row">
                  <div className="col">
                  <Figure style={{width: match ? '200px' : 'auto'}} className='d-flex'>
                  <Figure.Image
                    width={'100%'}
                    height="auto"
                    alt={item?.title}
                    src={item?.productImage}
                  />
                </Figure>
                <Stack direction="horizontal" gap={3}>
                  <div className="p-2">{'Stock: '}{}</div>
                  <div className="p-2">{'Lead Time: '}{}</div>
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
                  <div className="p-2"><strong>{}</strong></div>
                </Stack>
                  </div>
                  <div className="col">
                    <div className="payment-stocks">
                      <Stack className="p-3" gap={3}>
                        <header>
                          <strong>Orders</strong>
                          <hr />
                        </header>
                        {
                          item?.paymentRequest.map((el, index) => (
                              <Stack key={index}>
                                <header className="payment-method__credit">
                                  <strong>{el.orderMode.toUpperCase()}</strong>
                                </header>
                                <Accordion.Body>
                                  <Stack direction="horizontal" gap={3}>
                                    <div className="p-2">
                                      {/* <Form onChange={handleChange}>
                                        {['radio'].map((type) => (
                                          <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                              label="Your Sinesure Credit line"
                                              value="Your Sinesure Credit line"
                                              name="group1"
                                              type={type}
                                              id={1}
                                            />
                                            <Form.Check
                                              label="Your Darwin Credit line"
                                              value="Your Darwin Credit line"
                                              name="group1"
                                              type={type}
                                              id={2}
                                            />
                                            <Form.Check
                                              label="Your Factoring Credit line"
                                              value="Your Factoring Credit line"
                                              name="group1"
                                              type={type}
                                              id={3}
                                            />
                                          </div>
                                        ))}
                                      </Form> */}
                                    </div>
                                  </Stack>
                                  <Stack>
                                  <ListGroup>
                                    <ListGroup.Item>quantity: {el.quantity}</ListGroup.Item>
                                    <ListGroup.Item>price: {`${el.price} EUR`} </ListGroup.Item>
                                    <ListGroup.Item>location: {el.location ? el.location : '_'}</ListGroup.Item>
                                    <ListGroup.Item>Lead Time: {el.leadTime ? el.leadTime : '_'}</ListGroup.Item>
                                  </ListGroup>
                                  </Stack>
                                  {/* <Stack className="payment-method__methods rounded-3 py-2" direction="horizontal" gap={3}>
                                    <div className={match ? "p-2 mx-0" : "py-2 px-3 d-flex justify-content-between align-items-center w-100"}>
                                      <span>Cash in Advance</span><span className="text-right fs-4">{advanceForCredit[indexValue]}</span>
                                    </div>
                                    <div className={match ? "d-none" : "vr mx-auto"} />
                                    <div className={match ? "p-2 mx-0" : "py-2 px-3 d-flex justify-content-between align-items-center w-100"}>
                                      <span>Cash with Order</span><span className="text-right fs-4">{advanceForOrder[indexValue]}</span>
                                    </div>
                                  </Stack> */}
                                </Accordion.Body>
                              </Stack>
                          ))
                        }
                      </Stack>
                    </div>
                  </div>
                </div>
                
              </Accordion.Body>
            </Accordion.Item>
          )
        })
      }
    </Accordion>
    </>
  )
}

export default PaymentMethod;