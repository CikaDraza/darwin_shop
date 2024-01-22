import { RouterProvider } from 'react-router-dom'
import './App.scss'
import route from './route'
import { CartProvider } from './utils/Store';

function App() {

  return (
    <CartProvider>
      <RouterProvider router={route} />
    </CartProvider>
  )
}

export default App;