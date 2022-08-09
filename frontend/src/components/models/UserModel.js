import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState} from 'react';




export default function UserModal(props) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  


 
  return (
    <>
      <Button className='btn btn-primary me-2' onClick={handleShow}>
      View
      </Button>

      <Modal show={show}        
        size="lg"
        centered
      >
        <Modal.Header>
      
          <Modal.Title id="contained-modal-title-vcenter">User Profile</Modal.Title>
           
        </Modal.Header>
        <Modal.Body>


 <div className="form-group">
    <label for="formGroupExampleInput">First Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    value={props.fname}
    readOnly/>
  </div>

  <div class="form-group">
    <label for="formGroupExampleInput">Last Name</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    value={props.lname}
    readOnly/>
  </div>

  <div className="form-group">
    <label for="formGroupExampleInput">Email</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    value={props.email}
    readOnly/>
  </div>

  <div className="form-group">
    <label for="formGroupExampleInput">Date Of Birth</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    value={props.dob}
    readOnly/>
  </div>
 
  <div className="form-group">
    <label for="formGroupExampleInput">Mobile</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    value={props.mobile}
    readOnly/>
  </div>

  </Modal.Body>
    <Modal.Footer>
   
      <Button variant="danger" onClick={handleClose}>
        Exit
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
);
}