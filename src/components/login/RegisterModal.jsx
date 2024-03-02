import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import EyeShow from '../../assets/icons/EyeShow';
import EyeOff from '../../assets/icons/EyeOff';
import axios from 'axios';
import { CartContext } from '../../utils/Store';

function Register(props) {
  const { setUser, user, setAlertToastMessage, setShowAlertToast } = useContext(CartContext);
  const [validated, setValidated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    state: '',
    street: '',
    number: '',
    postalCode: '',
    phoneNr: '',
    vat: '',
    companyName: '',
    gender: '',
    typeOfCompany: '',
    officeStaff: '',
    externalSales: '',
    warehouse: '',
    instalactionForecast: '',
  });

  const handleClickShowPassword = () => setVisible((show) => !show);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const newErrors = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      city: '',
      state: '',
      street: '',
      number: '',
      postalCode: '',
      phoneNr: '',
      vat: '',
      companyName: '',
      gender: '',
      typeOfCompany: '',
      officeStaff: '',
      externalSales: '',
      warehouse: '',
      instalactionForecast: '',
    };

    let isValid = true;

    try {
      const formOutput = new FormData(event.currentTarget);
      const formData = {
        name: formOutput.get('name'),
        lastName: formOutput.get('lastName'),
        email: formOutput.get('email'),
        password: formOutput.get('password'),
        companyName: formOutput.get('companyName'),
        vat: formOutput.get('vat'),
        gender: formOutput.get('gender') === null ? '' : formOutput.get('gender'),
        billingAddress: {
          street: formOutput.get('street'),
          number: formOutput.get('number'),
          postalCode: formOutput.get('postalCode'),
          city: formOutput.get('city'),
          country: formOutput.get('state')
        },
        deliveryAddresses: [
          {
            warehouseName: "",
            street: "",
            number: null,
            postalCode: null,
            city: "",
            country: "",
            contactPersonName: "",
            contactPhone: "",
            contactEmail: ""
          }
        ],
        phoneNr: formOutput.get('phone'),
        details: {
          typeOfCompany: formOutput.get('typeOfCompany'),
          companySize: {
            officeStaff: Number(formOutput.get('officeStaff')),
            externalSales: Number(formOutput.get('externalSales')),
            warehouse: Number(formOutput.get('warehouse')),
            installationForecast: Number(formOutput.get('installationForecast'))
          }
        },
        darwinPartner: formOutput.get('partner') === 'on' ? true : false,
        newsletter: false
      }

      if (formData?.password === formOutput?.repeate_password) {
        newErrors.password = 'Please confirm password';
        isValid = false;
      }
      console.log(formData);
      setErrors(newErrors);
      if (isValid) {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        };
        const { data } = await axios.post('https://darwin-server-351c4f98acbb.herokuapp.com/accounts/create', formData, config);
        console.log(data);
        setUser(data);
        props.onHide();
        setAlertToastMessage('Successfuly registerd');
        setShowAlertToast(true);
      }

    } catch (error) {
      console.log({ message: "An error occurred while register user", error }, error?.response?.status);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Register
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                name='name'
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback>{errors?.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                name='lastName'
                type="text"
                placeholder="Last name"
              />
              <Form.Control.Feedback>{errors?.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validation03">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  name='email'
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validation04">
              <Form.Label>Company Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name='companyName'
                  placeholder="Company"
                  aria-describedby="inputGroupCompany"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.companyName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validation05">
              <Form.Label>VAT</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name='vat'
                  placeholder="VAT"
                  aria-describedby="inputGroupVAT"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.vat}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validation06">
              <Form.Label>Phone</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="phone"
                  name='phone'
                  placeholder="Phone"
                  aria-describedby="inputGroupPhone"
                  required
                />
                <Form.Control.Feedback type="invalid">
                {errors?.phoneNr}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  name='password'
                  placeholder="New Password"
                  aria-describedby="inputGroupPassword"
                  required
                />
                <Form.Control.Feedback type="invalid">
                {errors?.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationRepeatePassword">
              <Form.Label>Repeate Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={visible ? "text" : "password"}
                  name='repeate_password'
                  placeholder="Repeate Password"
                  aria-describedby="inputGroupReapeate"
                  required
                />
                <Form.Control.Feedback type="invalid">
                {errors?.password}
                </Form.Control.Feedback>
                <InputGroup.Text onClick={handleClickShowPassword} id="inputGroupShow">
                  {
                    visible ? <EyeShow /> : <EyeOff />
                  }
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Modal.Header className='mb-3'>
              <Modal.Title id="Billing-modal">
                Billing Address
              </Modal.Title>
            </Modal.Header>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <Form.Label>City</Form.Label>
              <Form.Control name='city' type="text" placeholder="City" required />
              <Form.Control.Feedback type="invalid">
              {errors?.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label>State</Form.Label>
              <Form.Control name='state' type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
              {errors?.state}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom09">
              <Form.Label>Street</Form.Label>
              <Form.Control name='street' type="text" placeholder="Street" required />
              <Form.Control.Feedback type="invalid">
              {errors?.street}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom10">
              <Form.Label>Number</Form.Label>
              <Form.Control name='number' type="text" placeholder="Number" required />
              <Form.Control.Feedback type="invalid">
              {errors?.number}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom11">
              <Form.Label>Zip</Form.Label>
              <Form.Control name='postalCode' type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
              {errors?.postalCode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Modal.Header className='mb-3'>
              <Modal.Title id="Details-modal">
                Details
              </Modal.Title>
            </Modal.Header>
            <Form.Group as={Col} md="4" controlId="validationCustom12">
              <Form.Label>Type of Company</Form.Label>
              <Form.Control name='typeOfCompany' type="text" placeholder="Type of Company" required />
              <Form.Control.Feedback type="invalid">
              {errors?.typeOfCompany}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom13">
              <Form.Label>Office Staff</Form.Label>
              <Form.Control name='officeStaff' type="number" placeholder="Office Staff" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom14">
              <Form.Label>External Sales</Form.Label>
              <Form.Control name='externalSales' type="number" placeholder="External Sales" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom15">
              <Form.Label>Warehause</Form.Label>
              <Form.Control name='warehouse' type="number" placeholder="Warehouse" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom16">
              <Form.Label>Installation Forecast</Form.Label>
              <Form.Control name='installationForecast' type="number" placeholder="Installation Forecast" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              label="Darwin Partner"
              name="partner"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
              name='terms'
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function RegisterModal({ setRegModalShow, regModalShow }) {
  
  return (
    <Register
      show={regModalShow}
      onHide={() => setRegModalShow(false)}
    />
  );
}

export default RegisterModal;