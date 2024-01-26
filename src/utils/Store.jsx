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
    const savedProducts = localStorage.getItem('cart');
    return savedProducts ? JSON.parse(savedProducts) : { items: [] };
  });
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [lastModifiedProduct, setLastModifiedProduct] = useState(null);
  const cartItems = user?._id ? (cart[0]?.items || []) : (cart?.items || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      syncCartWithDatabase();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const addToCart = async (product) => {
    const itemsArray = cart.items ? cart.items : [];

    const productExists = itemsArray.some(item => item.productId === product._id);
    
    const newItem = {
      productId: product._id,
      productImage: product.images[0].image,
      title: product.title,
      brand: product.brand,
      articleCode: `${product.article.code}-${product.article.nr}-${product.article.series}`,
      price: product.price.euro
    };
  
    if (productExists) {
      setToastMessage("The product has already been added to the cart.");
      setShowToast(true);
      const updatedCart = { ...cart, items: [...cart.items, newItem] };
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newCartItems = cart.items ? [...cart.items, newItem] : [newItem];
      const updatedCart = { ...cart, items: newCartItems };
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setToastMessage("Product added to cart.");
      setShowToast(true);
      setLastModifiedProduct(newItem);
  
      if (user?._id) {
        syncCartWithDatabase();
      } else {
        localStorage.setItem('cart', JSON.stringify({ ...cart, items: [...cart.items, newItem] }));
      }
    }
  };  

  const syncCartWithDatabase = async () => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };

    try {
      await axios.post('https://darwin-server-351c4f98acbb.herokuapp.com/cart/add', {
        userId: user._id,
        items: localCart.items
      });
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
  
    try {
      const { data: updatedCart } = await axios.get('https://darwin-server-351c4f98acbb.herokuapp.com/cart/get');
      setCart(updatedCart || { items: [] });
      localStorage.setItem('cart', JSON.stringify(updatedCart || { items: [] }));
    } catch (error) {
      console.error('Error fetching updated cart:', error);
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

  const removeFromCart = async (productId) => {
      const updatedCartItems = cartItems?.filter(item => item.productId !== productId);
      const updatedCart = { ...cart, items: updatedCartItems };

    if (user?._id) {
      try {
        const removeProduct = { 
          userId: user?._id,
          productId
        }
        const { data } = await axios.put('https://darwin-server-351c4f98acbb.herokuapp.com/cart/remove', removeProduct);
        setAlertToastMessage("Cart item removed from database.");
        syncCartWithDatabase();
      } catch (error) {
        console.error('Error removing product from cart:', error);
        setAlertToastMessage("Error removing product from cart.");
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setAlertToastMessage("Cart item removed from cart.");
    }
    setCart(updatedCart);
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
