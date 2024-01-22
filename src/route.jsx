import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Shop from "./view/Shop";
import ProductDetails from "./view/productDetails/ProductDetails";
import ShopLayout from "./layouts/ShopLayout";
import Cart from "./view/cart/Cart";
import Delivery from "./components/delivery_address/Delivery";
import CartLayout from "./layouts/cart_layout/CartLayout";
import OrderMode from "./components/order-mode/OrderMode";
import PaymentMethod from "./components/payment_method/PaymentMethod";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ShopLayout />}>
      <Route index element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/" element={<CartLayout />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/delivery-address" element={<Delivery />} />
        <Route path="/cart/order-mode" element={<OrderMode />} />
        <Route path="/cart/payment-method" element={<PaymentMethod />} />
      </Route>
    </Route>
  )
)

export default route;