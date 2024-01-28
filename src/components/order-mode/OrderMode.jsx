import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { CartContext } from '../../utils/Store';
import { Alert, Button, Col, Figure, Form, Row, Stack, Table } from 'react-bootstrap';
import './OrderMode.scss';
import axios from 'axios';
import OrderModeTable from './OrderModeTable';

function OrderMode() {
  const { user, cart, addToOrders, setAlertToastMessage, setShowAlertToast } = useContext(CartContext);
  const [checkedModes, setCheckedModes] = useState({
    production: false,
    factory: false,
    floating: false,
    eu: false
  });
  const [productDetails, setProductDetails] = useState({});
  const [activeKey, setActiveKey] = useState("0");
  const [products, setProducts] = useState([]);
  const cartItems = user?._id ? (cart[0]?.items || []) : (cart?.items || []);
  const [checkedModesPerProduct, setCheckedModesPerProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`https://darwin-server-351c4f98acbb.herokuapp.com/products/`);
        const cartProducts = cartItems.map(cart => {
          const filteredProducts = data.filter(item => item._id === cart.productId);
          return filteredProducts;
        }).flat();
        setProducts(cartProducts);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };

  const handleClose = (index) => {
    if (index <= cart.length - 1) {
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

  const updateCheckedModes = (productId, mode, isChecked) => {
    setCheckedModesPerProduct(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [mode]: isChecked
      }
    }));
  };

  const addToOrderWithCheckedModes = (item, index) => {
    setAlertToastMessage('');
    setShowAlertToast(false);
    const itemDetails = productDetails[item._id] || {};
    const checkedModes = checkedModesPerProduct[item._id] || {};
    const isAnyModeChecked = Object.values(checkedModes).some(value => value);

    if (!isAnyModeChecked) {
        setAlertToastMessage('Please check order mode');
        setShowAlertToast(true);
        return;
    }

    let allRequiredSelectionsMade = true;
    Object.keys(checkedModes).forEach(mode => {
      if (checkedModes[mode]) {
        const modeDetails = itemDetails[mode === 'production' ? `${mode.toUpperCase()} ORDER` : mode === 'factory' ? `${mode.toUpperCase()} STOCK` : mode === 'floating' ? `${mode.toUpperCase()} STOCK` : `${mode.toUpperCase()} WAREHOUSE`];
        if (mode !== 'factory' && (mode === 'floating' || mode === 'eu') && (!modeDetails.location)) {
          setAlertToastMessage(`Please select a location for ${mode.toUpperCase()} STOCK`);
          setShowAlertToast(true);
          allRequiredSelectionsMade = false;
          return;
        }
        if ((mode === 'floating' || mode === 'eu') && !modeDetails.location) {
          setAlertToastMessage(`Please select a location for ${mode.toUpperCase()} STOCK`);
          setShowAlertToast(true);
          allRequiredSelectionsMade = false;
          return;
        }
        const { quantity, location, leadTime, totalPrice } = modeDetails;
        addToOrders(item, mode, quantity, location, leadTime, totalPrice);
        handleClose(index);
      }
    });

    if (!allRequiredSelectionsMade) return;
  };

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
    <Accordion defaultActiveKey={cartItems?.map((item, index) => index.toString())} onSelect={handleSelect} activeKey={activeKey}>
      {
        products?.map((item, index) => {
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
                          ['PRODUCTION ORDER', 'FACTORY STOCK', 'FLOATING STOCK', 'EU WAREHOUSE'].map((mode, i) => (
                            <OrderModeTable
                              key={mode + i}
                              mode={mode}
                              item={item}
                              productDetails={productDetails}
                              updateProductDetails={updateProductDetails}
                              setCheckedModes={setCheckedModes}
                              i={i}
                              updateCheckedModes={updateCheckedModes}
                            />
                          ))
                        }
                      </tbody>
                    </Table>
                    <Row>
                      <Col className='d-flex justify-content-end'>
                        <Button id={index} onClick={(e) => addToOrderWithCheckedModes(item, index)} variant='danger' className='text-white rounded-0'>Choose</Button>
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