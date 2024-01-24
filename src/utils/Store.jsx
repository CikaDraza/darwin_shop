import React, { createContext, useEffect, useState } from 'react';
import AddProductToast from '../components/toasts/AddProductToast';
import AlertToast from '../components/toasts/AlertToast';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showAlertToast, setShowAlertToast] = useState(false);
  const [alertToastMessage, setAlertToastMessage] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [accountCart, setAccountCart] = useState([]);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [lastModifiedProduct, setLastModifiedProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    getAccountCart();
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const getAccountCart = async() => {
    try {
      const { data } = await axios.get('https://darwin-server-351c4f98acbb.herokuapp.com/cart/get');
      console.log(data);
      setAccountCart(data);
      setToastMessage("Product added to user account cart.");
      setShowToast(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }

  const addToCart = async (product) => {
    const productExists = cart.some(item => item._id === product._id);
    if (productExists) {
      setAlertToastMessage("The product has already been added to the cart.");
      setShowAlertToast(true);
    } else {
      setCart([...cart, product]);
      setToastMessage("Product added to cart.");
      setShowToast(true);
      setLastModifiedProduct(product);

      if (user) {
        if (localStorage.getItem('cart')) {
          const localCartItems = JSON.parse(localStorage.getItem('cart'));
          localCartItems.forEach(async localItem => {
            const cartItem = {
              userId: user._id,
              productImage: localItem.images[0].image,
              title: localItem.title,
              brand: localItem.brand,
              articleCode: `${localItem.article.code}-${localItem.article.nr}-${localItem.article.series}`,
              price: localItem.price.euro,
            };
            try {
              const { data } = await axios.post('https://darwin-server-351c4f98acbb.herokuapp.com/cart/add', cartItem);
              console.log(cartItem);
              setToastMessage("Product added to user account cart.");
              setShowToast(true);
            } catch (error) {
              console.error('Error adding product to cart:', error);
            }
          });
          localStorage.removeItem('cart');
        }
      }
    
    }
  };

  const addToOrders = (item, mode, quantity, location, leadTime, totalPrice) => {
    const newItem = { 
      productId: item._id,
      orderMode: mode, 
      quantity, 
      location,
      leadTime: leadTime?.toLocaleDateString(),
      price: totalPrice,
      title: item?.title,
      article: item?.article?.code + ' ' + item?.article?.nr + ' ' + item?.article?.series,
      brand: item?.brand
    };
  
    const existingOrderIndex = orders.findIndex(order => order.productId === item._id && order.orderMode === mode);
    if (existingOrderIndex > -1) {
      let updatedOrders = [...orders];
      updatedOrders[existingOrderIndex] = newItem;
      setOrders(updatedOrders);
      setToastMessage("Order mode choosed.");
      setShowToast(true);
    } else {
      setOrders([...orders, newItem]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
    setOrders([]);
    setAlertToastMessage("Product removed from cart.");
    setShowAlertToast(true);
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, addToOrders, setUser, user, setAlertToastMessage, setShowAlertToast }}>
      {children}
      <AddProductToast showToast={showToast} toastMessage={toastMessage} setShowToast={setShowToast} product={lastModifiedProduct} />
      <AlertToast showAlertToast={showAlertToast} alertToastMessage={alertToastMessage} setShowAlertToast={setShowAlertToast} />
    </CartContext.Provider>
  );
};
