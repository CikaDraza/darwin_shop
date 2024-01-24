import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CartContext } from '../../utils/Store';
import axios from 'axios';

function LoginComponent(props) {
  const { setUser, user, setAlertToastMessage, setShowAlertToast } = useContext(CartContext);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    setValidated(false);
    setErrors({...errors, email: '', password: ''});
    setValidated(true);

    try {
      const formOutput = new FormData(event.currentTarget);
      const formData = {
        email: email,
        password: formOutput.get('password'),
      }

      const newErrors = {
        email: '',
        password: '',
      };

      let isValid = true;

      if (formData.email === '') {
        newErrors.email = 'Please fill email field';
        isValid = false;
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
        isValid = false;
      }

      if (formData.password === '') {
        newErrors.password = 'Please fill password field';
        isValid = false;
      }else if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters long and include at least one number';
        isValid = false;
      }

      setErrors(newErrors);
      if (isValid) {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        };
        const { data } = await axios.post('http://localhost:5000/accounts/login', formData, config);
        setUser(data);
        props.onHide();
        setAlertToastMessage('Successfuly loged');
        setShowAlertToast(true);
      }
    } catch (error) {
      console.log({ message: "An error occurred while login a user", error }, error.response.status);
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
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter email" />
            <Form.Control.Feedback type='invalid'>{errors?.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control isInvalid={!!errors.password} required type="password" placeholder="Password" name='password' />
            <Form.Control.Feedback type='invalid'>{errors?.password}</Form.Control.Feedback>
          </Form.Group>
          <Button type='submit'>Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function LoginModal({ modalShow, setModalShow }) {
  
  return (
    <LoginComponent
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  );
}

export default LoginModal;