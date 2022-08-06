import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert';



export default function NoteModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  useEffect(()=>{
    setTitle(props.title);
    setDescription(props.description);
    
    },[]);
   
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);  
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);  
  }
  

  const noteUpdate = (id) => {
   
    axios.put(`http://127.0.0.1:8090/usernote/update/${id}`,{title:title,description:description})
        .then((res) => setShow(false),
        alert("Updated succussful")
        
        ).catch(err => console.log(err))
        
};

const setDelete=(id)=>{
       
  axios.put(`http://localhost:8090/supplier/setdeletesuppierq/${id}`).then((res)=>{
  alert("Supplier Deleted").catch(err=>{
     alert("Error")
  });
  });

  


};
 
  return (
    <>
      <Button className='btn btn-primary me-2' onClick={handleShow}>
      Update
      </Button>

      <Modal show={show}        
        size="lg"
        centered
      >
        <Modal.Header>
      
          <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
           
        </Modal.Header>
        <Modal.Body>


 <div class="form-group">
    <label for="formGroupExampleInput">Title</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"
    onChange={handleChangeTitle}
    value={title}
    required/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Description</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"
    onChange={handleChangeDescription}
    value={description}
    required/>
  </div>

  </Modal.Body>
    <Modal.Footer>
   
      <Button variant="success" onClick={() => { noteUpdate(props.id) }}>
    Update
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Exit
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
);
}