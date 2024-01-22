import { ListGroup } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ProductTabs({ product }) {

  return (
    <Tabs
      defaultActiveKey="financing"
      id="uncontrolled-tab"
      className="my-5"
    >
      <Tab eventKey="specification" title="Specification">
        <ListGroup style={{maxWidth: '50ch'}}>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div>
                <p>
                  Package Type
                </p>
              </div>
            </div>
            <div className="fw-bold">
              <p>
              {product?.packaging?.package_type}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div>
                <p>
                  Dimension
                </p>
              </div>
            </div>
            <div className="fw-bold">
              <p>
              {product?.packaging?.width}{'x'}{product?.packaging?.height}{'x'}{product?.packaging?.length}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div>
                <p>
                  PCS/container
                </p>
              </div>
            </div>
            <div className="fw-bold">
              <p>
              {product?.packaging?.piecesPer20ft}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div>
                <p>
                  Pallets/container
                </p>
              </div>
            </div>
            <div className="fw-bold">
              <p>
              {product?.packaging?.palletsPer20ft}
              </p>
            </div>
          </ListGroup.Item>
        </ListGroup>
        
      </Tab>
      <Tab eventKey="details" title="Details">
        {product?.productInfo}
      </Tab>
      <Tab eventKey="financing" title="Financing">
        Tab content for Financing
      </Tab>
    </Tabs>
  );
}

export default ProductTabs;