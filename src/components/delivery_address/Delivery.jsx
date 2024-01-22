import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { CartContext } from '../../utils/Store';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function Delivery() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [accounts, setAccounts] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`https://darwin-server-351c4f98acbb.herokuapp.com/accounts`);
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false)
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Delivery Address</Accordion.Header>
        <Accordion.Body>
          {
            !accounts ?
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      defaultValue="Mark"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid state.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid zip.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button variant='secondary' type="submit">Submit form</Button>
              </Form>
            :
            <Form>
              <Form.Group className="mb-3" controlId="warehouseName">
                <Form.Label>Warehouse Name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.warehouseName} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.street} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.number} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.postalCode} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.city} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.country} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactPersonName">
                <Form.Label>Contact Person Name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.contactPersonName} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactPhone">
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.contactPhone} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.deliveryAddresses[0]?.contactEmail} />
              </Form.Group>
            </Form>
          }
        </Accordion.Body>
      </Accordion.Item>

      {
        !accounts ?
          <Accordion.Item eventKey="1">
            <Accordion.Header>Company Info</Accordion.Header>
            <Accordion.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      defaultValue="Mark"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      defaultValue="Otto"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" placeholder="State" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid state.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip" required />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid zip.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button variant='secondary' type="submit">Submit form</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        :
        <Accordion.Item eventKey="1">
          <Accordion.Header>Company Info</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.companyName} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.email} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="last-name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.lastName} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone-number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.phoneNr} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="vat">
                <Form.Label>VAT</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.vat} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control plaintext readOnly defaultValue={accounts[0]?.gender} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      }

      <Accordion.Item eventKey="2">
        <Accordion.Header>Billing Address</Accordion.Header>
        <Accordion.Body>
        {
        !accounts ?
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        defaultValue="Mark"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        defaultValue="Otto"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                      <Form.Label>Username</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="City" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" placeholder="State" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control type="text" placeholder="Zip" required />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid zip.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Check
                      required
                      label="Agree to terms and conditions"
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                    />
                  </Form.Group>
                  <Button variant='secondary' type="submit">Submit form</Button>
          </Form>
          :
          <Form>
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control plaintext readOnly defaultValue={accounts[0]?.billingAddress?.street} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Number</Form.Label>
              <Form.Control plaintext readOnly defaultValue={accounts[0]?.billingAddress?.number} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control plaintext readOnly defaultValue={accounts[0]?.billingAddress?.postalCode} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control plaintext readOnly defaultValue={accounts[0]?.billingAddress?.city} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control plaintext readOnly defaultValue={accounts[0]?.billingAddress?.country} />
            </Form.Group>
          </Form>
        }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Delivery;