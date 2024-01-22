import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Card.scss'
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card className='my-2' style={{ width: '100%' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.images[0].image} />
      </Link>
      <Card.Body>
        <Card.Title className='mb-3'>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Article Code: {product.article.code}{' '}{product.article.nr}{' series '}{product.article.series}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted fs-2">{product.price.euro} EUR</Card.Subtitle>
        <ListGroup className='mb-2' variant="flush">
          <ListGroup.Item className='d-flex justify-content-between'><span>Now Available</span><span>152 pcs</span></ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'><span>As of 20.feb </span><span>152 pcs</span></ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'><span>As of 15.mar</span><span>252 pcs</span></ListGroup.Item>
        </ListGroup>
        <Link className='w-100' to={`/product/${product._id}`}>
          <Button className='w-100' variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;