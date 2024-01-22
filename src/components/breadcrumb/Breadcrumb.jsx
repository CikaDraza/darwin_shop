import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { NavLink } from 'react-router-dom';

function BreadcrumbNav({ data }) {

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <NavLink to="/">
          Shop
        </NavLink>
      </Breadcrumb.Item>
      {
        data?.brand &&
        <Breadcrumb.Item>
           <NavLink to="/">
            {data?.brand}
           </NavLink>
        </Breadcrumb.Item>
      }
      {
        data?.title &&
        <Breadcrumb.Item active>{data?.title}</Breadcrumb.Item>
      }
    </Breadcrumb>
  );
}

export default BreadcrumbNav;