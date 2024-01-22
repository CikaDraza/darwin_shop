import { useCallback, useContext, useRef, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { CartContext } from '../../utils/Store';
import { Alert, Button, Col, Figure, Form, Row, Stack, Table } from 'react-bootstrap';
import CountQuantity from '../count_quantity/CountQuantity';
import './OrderMode.scss';

function OrderMode() {
  const { cart, addToOrders } = useContext(CartContext);
  const [checkedModes, setCheckedModes] = useState({
    production: false,
    factory: false,
    floating: false,
    eu: false
  });
  const [productDetails, setProductDetails] = useState({});
  const [activeKey, setActiveKey] = useState("0");

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };

  const handleClose = (index) => {
    if (index < cart.length - 1) {
      setActiveKey(`${index + 1}`);
    }
  };

  const updateProductDetails = (productId, mode, details) => {
    setProductDetails(prevDetails => ({
      ...prevDetails,
      [productId]: {
        ...prevDetails[productId],
        [mode]: details
      }
    }));
  };

  const handleQuantityChange = useCallback((productId, mode, quantity, item, setModeTotalPrice) => {
    const modeKey = mode.split(' ')[0].toLowerCase();
    const priceKey = `${modeKey}_price`;
    const pricePerUnit = item.price[priceKey] || 0;
    const totalPrice = quantity * pricePerUnit;
    setModeTotalPrice(totalPrice)
    updateProductDetails(productId, mode, {
      quantity,
      totalPrice,
      item,
      mode
    });
  });

  const calculateLeadTime = (mode, location) => {
    const currentDate = new Date();
    let leadTimeDays;
    if (mode === 'FLOATING STOCK' && location === 'FLOATING-STOCK-1' || location === 'FLOATING-STOCK-2' || location === 'FLOATING-STOCK-3') {
      leadTimeDays = 5;
    } else if (mode === 'EU WAREHOUSE' && location === 'EU-WAREHOUSE-1') {
      leadTimeDays = 7;
    } else if (mode === 'EU WAREHOUSE' && location === 'EU-WAREHOUSE-2') {
      leadTimeDays = 10;
    }
    currentDate.setDate(currentDate.getDate() + leadTimeDays);
  
    return currentDate;
  }  

  const handleLocationChange = (productId, mode, location) => {
    const leadTime = calculateLeadTime(mode, location);
    updateProductDetails(productId, mode, {
      ...productDetails[productId]?.[mode],
      location,
      leadTime: leadTime
    });
  };

  const addToOrderWithCheckedModes = (item, index) => {
    const itemDetails = productDetails[item._id] || {};
    Object.keys(checkedModes).forEach(mode => {
      if (checkedModes[mode]) {
        Object.keys(itemDetails).forEach(orderMode => {
          const { quantity, location, leadTime, totalPrice } = itemDetails[orderMode];
          addToOrders(item, mode, quantity, location, leadTime, totalPrice);
          handleClose(index);
        })
      }
    });
  };

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
    <Accordion defaultActiveKey={cart?.map((item, index) => index.toString())} onSelect={handleSelect} activeKey={activeKey}>
      {
        cart?.map((item, index) => {

          return (
            <Accordion.Item key={item?._id} eventKey={`${index}`}>
              <Accordion.Header>
                <Figure className='d-flex m-0 accordion-img'>
                  <Figure.Image
                    className='mb-0'
                    width={50}
                    height={50}
                    alt={item?.title}
                    src={item?.images[0].image}
                  />
                  <Figure.Caption className='mx-3 text-white d-flex align-items-center flex-wrap'>
                    {item.title}
                    <small className='w-100'>{item?.article?.code}{'-'}{item?.article?.nr}{'-'}{item?.article?.series}</small>
                  </Figure.Caption>
                </Figure>
              </Accordion.Header>
              <Accordion.Body>
                <Stack gap={3}>
                  <div className="p-2">
                    <Table responsive="sm">
                      <thead>
                        <tr align="center">
                          <th>#</th>
                          <th>Order Mode</th>
                          <th>Lead Time</th>
                          <th>Stock Availabel</th>
                          <th>MOQ</th>
                          <th>QTY</th>
                          <th>Price/pcs</th>
                          <th>Price/WP</th>
                          <th>View Stocks</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ['PRODUCTION ORDER', 'FACTORY STOCK', 'FLOATING STOCK', 'EU WAREHOUSE'].map((mode, i) => {
                            const [modeTotalPrice, setModeTotalPrice] = useState(0);
                            
                            const modeKey = mode.split(' ')[0].toLowerCase();
                            const priceKey = `${modeKey}_price`;
                            const leadTime = productDetails[item._id]?.[mode]?.leadTime;
                            const handleCheckChange = (mode, isChecked) => {
                              setCheckedModes(prevModes => ({
                                ...prevModes,
                                [mode]: isChecked
                              }));
                            };

                            return (
                              <tr key={mode}>
                                <td>{i + 1}</td>
                                <td>
                                  <Form>
                                    <Form.Check
                                      disabled={!item?.stocks[mode.split(' ')[0].toLowerCase()]}
                                      type="checkbox"
                                      id={`${mode}`}
                                      label={`${mode}`}
                                      onChange={(e) => handleCheckChange(modeKey, e.target.checked)}
                                    />
                                  </Form>
                                </td>
                                <td>{leadTime ? leadTime.toLocaleDateString() : ''}</td>
                                <td>{item?.stocks[mode.split(' ')[0].toLowerCase()] || 'N/A'}</td>
                                <td>{item?.moq[mode.split(' ')[0].toLowerCase()] || 'N/A'}</td>
                                <td className='count-qty'>
                                  <CountQuantity 
                                    min={item.moq[mode.split(' ')[0].toLowerCase()]} 
                                    max={item.stocks[mode.split(' ')[0].toLowerCase()]}
                                    onQuantityChange={(quantity) => handleQuantityChange(item?._id, mode, quantity, item, setModeTotalPrice)}
                                    availabel={item?.stocks[mode.split(' ')[0].toLowerCase()]}
                                  />
                                </td>
                                <td>{item?.price[priceKey] || 'N/A'}{' EUR'}</td>
                                <td>{`${item?.price?.euro_per_wp}`}{' EUR'}</td>
                                <td>
                                  {
                                    mode === 'FLOATING STOCK' &&
                                    <Form.Select size="small" className='fs-caption' aria-label="select-shipment" onChange={(e) => handleLocationChange(item._id, mode, e.target.value)}>
                                      <option>select floating</option>
                                      <option value="FLOATING-STOCK-1">FLOATING-STOCK-1</option>
                                      <option value="FLOATING-STOCK-2">FLOATING-STOCK-2</option>
                                      <option value="FLOATING-STOCK-3">FLOATING-STOCK-3</option>
                                    </Form.Select>
                                  }
                                  {
                                    mode === 'EU WAREHOUSE' &&
                                    <Form.Select size="small" className='fs-caption' aria-label="select-shipment" onChange={(e) => handleLocationChange(item._id, mode, e.target.value)}>
                                      <option>select werehouse</option>
                                      <option value="EU-WAREHOUSE-1">EU-WAREHOUSE-1</option>
                                      <option value="EU-WAREHOUSE-2">EU-WAREHOUSE-2</option>
                                    </Form.Select>
                                  }
                                </td>
                                <td>
                                  {modeTotalPrice.toFixed(2)}{' EUR'}
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                    <Row>
                      <Col className='d-flex justify-content-end'>
                        <Button onClick={() => addToOrderWithCheckedModes(item, index)} variant='danger' className='text-white rounded-0'>Choose</Button>
                      </Col>
                    </Row>
                  </div>
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
            )
        })
      }
    </Accordion>
  );
}

export default OrderMode;