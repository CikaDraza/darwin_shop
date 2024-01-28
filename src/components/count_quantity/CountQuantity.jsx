import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function CountQuantity({ min, max, onQuantityChange, availabel }) {
  const [quantity, setQuantity] = useState(min);

  const handleIncrement = () => {
    setQuantity(prevQuantity => availabel !== undefined ? Math.min(prevQuantity + 1, max) : 'NaN');
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => availabel !== undefined ? Math.max(prevQuantity - 1, min) : min);
  };

  React.useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity]);

  return (
    <div className='d-flex align-items-center'>
      <Button onClick={handleDecrement} disabled={quantity === min}>-</Button>
      <span className='w-100 text-center'>{quantity}</span>
      <Button onClick={handleIncrement} disabled={quantity === max}>+</Button>
    </div>
  );
}
