import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import { NavLink } from 'react-router-dom';

function ActionButton({ addToCart, product, text, cancelBtn, positon, isFetchBtn, bgVariant, color, href, text_cancel, href_back, color_cancel }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => {
    addToCart(product)
    setLoading(isFetchBtn ? true : false);
  }

  return (
    <Stack gap={2} className={positon === 'center' ? 'col-md-5 mx-auto' : positon === 'left' ? 'col-md-5 mx-0 ml-0 mr-auto' : positon === 'full' ? 'col-md-12' : positon === 'right' ? 'col-md-5 ml-auto mr-0' : ''}>
      {
        !isLoading && !href ?
        <Button disabled={isLoading} onClick={!isLoading ? handleClick : null} variant={bgVariant ? bgVariant : "secondary"}>
          {text}
        </Button>
        :
        href ?
        <Button disabled={isLoading} variant={bgVariant ? bgVariant : "secondary"}>
          <NavLink className={color} to={href}>
            {text}
          </NavLink>
        </Button>
        :
        <Button disabled={isLoading}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> 
          {' '}Loading ...
        </Button>
      }
      {
        cancelBtn && !href &&
        <Button variant="outline-secondary">Cancel</Button>
      }
      {
        cancelBtn && href &&
        <Button variant="outline-secondary">
          <NavLink className={color_cancel} to={href_back}>
            {text_cancel}
          </NavLink>
        </Button>
      }
    </Stack>
  );
}

export default ActionButton;