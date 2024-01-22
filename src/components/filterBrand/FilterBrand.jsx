import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import './FilterBrand.scss';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function FilterBrand({ brands, handleBrandChange, selectedBrand, setSelectedBrand }) {
  
  const onBrandClick = (brand) => {
    setSelectedBrand(brand);
    handleBrandChange(brand);
  };

  if (!brands) {
    <section>
      <div className='custom-container'>
        <p>
          Product not found
        </p>
        <div>
          <Link href="/">
            <Button>
              back to shop
            </Button>
          </Link>
        </div>
      </div>
    </section>
  }

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Brands</Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ol">
            {
              brands?.map(item => (
                  <ListGroup.Item
                    key={item.brand}
                    onClick={() => onBrandClick(item.brand)}
                    as="li"
                    className={`d-flex justify-content-between align-items-start ${item.brand === selectedBrand ? 'selected-brand' : ''}`}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.brand}</div>
                    </div>
                    <Badge bg="primary" pill>
                      {item.count}
                    </Badge>
                  </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default FilterBrand;