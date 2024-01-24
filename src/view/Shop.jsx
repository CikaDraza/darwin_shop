import React, { useEffect, useState } from 'react'
import '../layouts/ShopLayout.scss'
import SelectFilter from '../components/select/SelectFilter'
import ViewButtons from '../components/toggle_button/ViewButtons'
import Card from '../components/Card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import FilterBrand from '../components/filterBrand/FilterBrand'
import CloseButton from 'react-bootstrap/CloseButton';
import BreadcrumbNav from '../components/breadcrumb/Breadcrumb'
import Form from 'react-bootstrap/Form';

function Shop() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://darwin-server-351c4f98acbb.herokuapp.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [])

  const fetchProductsByBrand = async (byBrand) => {
    try {
      const { data } = await axios.get(`https://darwin-server-351c4f98acbb.herokuapp.com/products?brand=${byBrand}`);
      return data;
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleBrandChange = async (selectedBrand) => {
    const filteredProducts = await fetchProductsByBrand(selectedBrand);
    setProducts(filteredProducts);
    setSelectedBrand(selectedBrand);
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get('https://darwin-server-351c4f98acbb.herokuapp.com/products/count_brands');
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  }

  return (
    <div className="shop-wrapper">
      <div className="custom-container">
        <BreadcrumbNav data={products} />
        <section>
          <div className="row_shop">
            <header>
              <div className="row">
                <div className="column title">
                  <h2>Darwin Shop</h2>
                </div>
                <div className="column sort mb-3">
                  <SelectFilter />
                </div>
                <div className="column view d-none d-lg-block">
                  <ViewButtons />
                </div>
              </div>
            </header>
            <Container fluid>
              <Row className='pb-3'>
                <Col xs={12} md={6} lg={4} xxl={3}>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2 border-bottom border-0 rounded-0"
                      aria-label="Search"
                    />
                  </Form>
                </Col>
                <Col xs={12} md={6} lg={8} xxl={9}>
                  {
                    selectedBrand.length !== 0 &&
                    <button className='chips'>
                      {selectedBrand}
                      <CloseButton onClick={() => handleBrandChange('')} color='primary' />
                    </button>
                  }
                </Col>
              </Row>
            </Container>
            <aside className="column_shop column_shop--left d-none d-lg-block">  
              <FilterBrand brands={brands} handleBrandChange={handleBrandChange} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
            </aside>
            <div className="column_shop column_shop--right">
              <Container fluid>
                <Row>
                {
                products.map(product => (
                  <Col key={product._id} xs={12} md={6} lg={4} xxl={3}>
                    <Card product={product} />
                  </Col>
                ))
                }
                </Row>
              </Container>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Shop
