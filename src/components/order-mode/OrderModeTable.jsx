import React, { useCallback, useState } from 'react'
import CountQuantity from '../count_quantity/CountQuantity';
import { Form } from 'react-bootstrap';

export default function OrderModeTable(props) {
  const { mode, item, productDetails, updateProductDetails, setCheckedModes, i, updateCheckedModes } = props;
  const [modeTotalPrice, setModeTotalPrice] = useState(0);

  const modeKey = mode.split(' ')[0].toLowerCase();
  const priceKey = `${modeKey}_price`;
  const leadTime = productDetails[item._id]?.[mode]?.leadTime;

  const handleCheckChange = (mode, isChecked) => {
    setCheckedModes(prevModes => ({
      ...prevModes,
      [mode]: isChecked
    }));
    updateCheckedModes(item._id, mode, isChecked);
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

  return (
    <tr>
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
}
