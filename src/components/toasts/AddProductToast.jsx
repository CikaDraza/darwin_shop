import React from 'react';
import { Figure, ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import './Toast.scss'

function AddProductToast({ showToast, toastMessage, setShowToast, product }) {

  return (
      <ToastContainer position="middle-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast bg='secondary' onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header className='justify-content-between bg-danger text-white'>
            <Figure className='d-flex align-items-center m-0'>
              <Figure.Image
                width={50}
                height="auto"
                alt={product?.title}
                src={product?.productImage}
              />
              <Figure.Caption className='mx-3 text-white fw-bold'>
                {product?.title}
              </Figure.Caption>
            </Figure>
          </Toast.Header>
          <Toast.Body>
            <p className='text-white m-0'>
              {toastMessage}
            </p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
  );
}

export default AddProductToast;