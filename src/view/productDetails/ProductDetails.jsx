import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link, NavLink, useParams } from 'react-router-dom';
import Slider from "react-slick";
import './ProductDetails.scss'
import axios from 'axios';
import Heart from '../../assets/icons/Heart';
import ActionButton from '../../components/action_button/ActionButton';
import BreadcrumbNav from '../../components/breadcrumb/Breadcrumb';
import Stack from 'react-bootstrap/Stack';
import ProductTabs from '../../components/product_tabs/ProductTabs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CartContext } from '../../utils/Store';
import useMediaQuery from '../../components/useMediaQuery/useMediaQuery';

export default function ProductDetails() {
  const { id } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [product, setProduct] = useState([]);
  const { addToCart } = useContext(CartContext);
  const match = useMediaQuery(`(max-width: 768px)`);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://darwin-server-351c4f98acbb.herokuapp.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    speed: 500,
    centerMode: true
  };

  if(!product) {
    return (
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
    )
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      download pdf document
    </Tooltip>
  );
console.log(product.brand);
  return (
    <section>
      <div className='custom-container'>
        <BreadcrumbNav data={product} />
        <Row>
          <Col className='mb-3' xs={12} md={5}>
            <Slider
            {...settings}
            asNavFor={nav2}
            ref={slider => setNav1(slider)}
            className="slider-for"
            >
              {
                product?.images?.map((img, idx) => (
                  <img
                    key={idx}
                    className="d-flex w-100"
                    src={img.image}
                    alt={`image-${idx}`}
                  />
                ))
              }
            </Slider>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={slider => setNav2(slider)}
              className="slider-nav"
            >
              {
                product?.images?.map((img, idx) => (
                  <div key={idx}>
                    <img src={img.image} alt={`thumbnail-${idx}`} />
                  </div>
                ))
              }
            </Slider>
          </Col>
          <Col xs={12} md={7}>
            <div>
              <div className='d-flex flex-wrap justify-content-between'>
                <h1>{product?.title}</h1>
                <Button variant='outline' className='wishlist-btn'>
                  <Heart /> 
                  <span className='btn-text'>
                    add to wishlist
                  </span>
                </Button>
              </div>
              <p>Article Code: {product?.article?.code}{' '}{product.article?.nr}{' series '}{product?.article?.series}</p>
              <p>{product?.productInfo}</p>
            </div>
            <hr />
            <div className='d-flex flex-column add-to-cart-text'>
              <span className='price fs-2 text-primary'>
                {`EUR ${product?.price?.euro}`}
              </span>
            </div>
            <Col className='pt-5'>
              <Stack direction={match ? "vertical" : "horizontal"} gap={3}>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>package type</h6>
                  <p>{product?.packaging?.package_type}</p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>package dimension</h6>
                  <p>{product?.packaging?.width}x{product?.packaging?.height}x{product?.packaging?.length}</p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>pcs / palette</h6>
                  <p>{`${product?.packaging?.piecesPer20ft}`}</p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>palette / container</h6>
                  <p>{`${product?.packaging?.palletsPer20ft}`}</p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>euro / watt peak</h6>
                  <p>{`${product?.price?.euro_per_wp}`}</p>
                </div>
              </Stack>
              <Stack direction={match ? "vertical" : "horizontal"} gap={3}>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>
                    <strong>stocks</strong>
                  </h6>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>production</h6>
                  <p>
                    {product?.stocks?.production}
                    {' '}
                    <small>({'MOQ: '}{product?.moq?.factory})</small>
                  </p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>factory</h6>
                  <p>
                    {product?.stocks?.factory}
                    {' '}
                    <small>({'MOQ: '}{product?.moq?.factory})</small>
                  </p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>floating</h6>
                  <p>
                    {`${product?.stocks?.floating}`}
                    {' '}
                    <small>({'MOQ: '}{product?.moq?.floating})</small>
                  </p>
                </div>
                <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                  <h6>eu warehouse</h6>
                  <p>
                    {`${product?.stocks?.eu}`}
                    {' '}
                    <small>({'MOQ: '}{product?.moq?.eu})</small>
                  </p>
                </div>
              </Stack>
              <hr />
              <Stack className={match ? 'flex-wrap' : 'flex-nowrap'} direction="horizontal" gap={3}>
                  <div className={match ? "w-100" : "p-2 mx-0"}>
                    <h6>
                      <strong>certifications:</strong>
                    </h6>
                  </div>
                {
                  product?.certifications?.IEC &&
                  <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                    <img width={80} height={'auto'} src='/images/iec-logo-desktop.jpg' alt='iec cerificat'/>
                  </div>
                }
                {
                  product?.certifications?.TUV &&
                  <>
                    <div className={match ? "d-none" : "vr"} />
                    <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                      <img width={80} height={'auto'} src='/images/TÜV_Süd_logo.svg.png' alt='tuv cerificat'/>
                    </div>
                  </>
                }
                {
                  product?.certifications?.MCS &&
                  <>
                    <div className={match ? "d-none" : "vr"} />
                    <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                      <img width={80} height={'auto'} src='/images/MCS-Certification.webp' alt='msc cerificat'/>
                    </div>
                  </>
                }
                {
                  product?.certifications?.windTunnel &&
                  <>
                    <div className={match ? "d-none" : "vr"} />
                    <div className={match ? "p-2 mx-0" : "p-2 mx-auto"}>
                      <img width={80} height={'auto'} src='/images/MCS-Certification.webp' alt='msc cerificat'/>
                    </div>
                  </>
                }
              </Stack>
            </Col>
            <hr />
            <Stack className='pb-5' direction="horizontal" gap={1}>
              <div className={match ? "p-0 mx-0" : "p-2 mx-0"}>
                <h6>
                  <strong>data sheet:</strong>
                </h6>
              </div>
              <div className={match ? "p-0 mx-0" : "p-2 mx-0"}>
              <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                <Button variant='flat' href='/downloads/design-module2023_04_11_V13_Ando_AN-410-182x91-FB-WB_Data_Sheet.pdf' download className='rounded-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                    <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" fill='#444'/>
                  </svg>
                </Button>
              </OverlayTrigger>
              </div>
              <div className={match ? "p-0 mx-0" : "p-2 mx-0"}>
                <h6>
                  <strong></strong>
                </h6>
              </div>
                <div className={match ? "p-0 mx-0" : "p-2 mx-0"}>
                  <h6>
                    <strong>warranty:</strong>
                  </h6>
                </div>
                {
                  product?.warranty?.factory &&
                  <div className="p-2 mx-0 d-flex flex-column align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" fill='#444'/>
                    </svg>
                    <h6>{Object.keys(product?.warranty)[0]}</h6>
                  </div>
                }
                {
                  product?.warranty?.linearPower &&
                  <div className="p-2 mx-0 d-flex flex-column align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512">
                      <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" fill='#444'/>
                    </svg>
                    <h6>{Object.keys(product?.warranty)[1] === 'linearPower' && 'Linear Power'}</h6>
                  </div>
                }
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2 w-100">
                <ActionButton addToCart={addToCart} product={product} text={'ADD TO CART'} cancelBtn={false} positon={'left'} isFetchBtn={true} bgVariant={'primary'} />
              </div>
              {
                product?.brand === 'Ando' &&
                <div className="p-2 w-100">
                  <NavLink to="/google_solar_calculator">
                    <Button variant="success">
                      Solar Calculator
                    </Button>
                  </NavLink>
                </div>
              }
            </Stack>            
          </Col>
        </Row>
        <section className='py-5'>
          <Row>
            <Col xs={12}>
            
            </Col>
            <Col>
              <ProductTabs product={product} />
            </Col>
          </Row>
        </section>
      </div>
    </section>
  )
}
