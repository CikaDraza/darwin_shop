import Form from 'react-bootstrap/Form';
import './SelectFilter.scss';

function SelectFilter() {
  return (
    <Form.Select className='select' aria-label="select">
      <option value="2">In Stock</option>
      <option value="1">Price: Hight to Low</option>
      <option value="3">Price: Low to Hight</option>
      <option value="4">Featured Products</option>
    </Form.Select>
  );
}

export default SelectFilter;