import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import requestConfigJson from "../../context/ConfigJson";


export default function NoteModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
 

  useEffect(()=>{
    setTitle(props.title);
    setDescription(props.description);
  
    },[]);
   
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);  
    setError("");
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value); 
    setError("");
  }
  

  const noteUpdate = (id) => {
   
    axios.put(`http://127.0.0.1:8090/usernote/update/${id}`,{title:title,description:description},requestConfigJson)
        .then((res) => {
          swal({
            title: "Success!",
            text: "Note Updated Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          }).then((()=>{
            setShow(false);
            window.location.href='/student/notelist'
          }))
        }       
        ).catch((err) => {
          setError(err.response.data.message);
        })
        
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


 <div className="form-group">
    <label for="formGroupExampleInput">Title</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
    onChange={handleChangeTitle}
    value={title}
    required/>
  </div>
  <div className="form-group">
    <label for="formGroupExampleInput2">Description</label>
    <input type="text"className="form-control" id="formGroupExampleInput2" placeholder="Another input"
    onChange={handleChangeDescription}
    value={description}
    required/>
  </div>

  {error &&
  <div className="alert alert-danger" role="alert">
  {error}
   </div>}
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