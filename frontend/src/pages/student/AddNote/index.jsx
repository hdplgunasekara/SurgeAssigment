import React from "react";
import { useState } from "react";
import  "./noteadd.styles.css";
import axios from 'axios';
import swal  from "sweetalert";


const AddNote = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
	

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);  
        setError("");
      }
      const handleChangeDescription = (event) => {
        setDescription(event.target.value);  
        setError("");
      }


      const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8090/usernote/add";
			const { data: res } = await axios.post(url, {title:title,description:description}).then(()=>{
            alert("Added Successful");
            window.location.reload();
        
            })			
		} catch (error) {
			if(error.response){
			setError("Error! Please Try Again");
            }
			
		}
	};
   
    return (
  <div className="Addnote"> 
      <div className="Note-form-container">
        <form className="Note-form" method="POST" onSubmit={handleSubmit}>
          <div className="Note-form-content">
            <h3 className="Note-form-title">Add Note</h3>
            <div className="form-group mt-3">
              <label>Note Title</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter title"
                onChange={handleChangeTitle}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Note Description</label>
              <textarea class="form-control mt1" placeholder="Enter description"  rows="4"
              onChange={handleChangeDescription}
              required
              ></textarea>
            </div>
            <br/>
            {error &&
            <div class="alert alert-danger" role="alert">
            {error}
            </div>}
            
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" >
                Add
              </button>
            </div>
           
          </div>
        </form>
      </div>
    </div>
    )
};

export default AddNote;