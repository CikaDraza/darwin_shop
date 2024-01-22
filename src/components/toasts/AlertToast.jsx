import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function AlertToast({ showAlertToast, alertToastMessage, setShowAlertToast }) {
  
  return (
    <ToastContainer position="bottom-start" className="p-3 position-fixed" style={{ zIndex: 1 }}>
      <Toast bg='dark' onClose={() => setShowAlertToast(false)} show={showAlertToast} delay={3000} autohide>
        <Toast.Header>
          <div className="p-2 mx-auto">
          </div>
        </Toast.Header>
        <Toast.Body>
          <p className='text-warning m-0'>
            {alertToastMessage}
          </p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AlertToast;