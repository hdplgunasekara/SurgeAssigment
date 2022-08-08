import React, { useContext } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import  "./completep.styles.css";
import swal from "sweetalert";
import { LoadingOverlay } from '@mantine/core';
import axios from "axios";


const CompleteProfile = () => {
const [isLoading, setIsLoading] = useState(false);
const param = useParams();
const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    password: "",
    repassword:""
});

const [error, setError] = useState("");

const handleChange = ({ currentTarget: input }) => {
        setError("")
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
      
		e.preventDefault();
		try {
      setIsLoading(true);
			const url = `http://localhost:8090/user/completeprofile/${param.id}`;
			 await axios.put(url, data).then(res=>{
                swal({
                    title: "Success!",
                    text: "Profile Completed Successfully, Please Log In",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                  })
                  .then(function(){
                    setIsLoading(false);
                    window.location.href='/login';
                  })
                 
                }
      
                )
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        setIsLoading(false)
				setError(error.response.data.message);
			}
		}
	};

 
    return (

      <div className="Auth-form-container">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Complete Your Profile</h3>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter First Name" 
                onChange={handleChange}       
                name="firstName"       
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Last Name" 
                name="lastName"  
                onChange={handleChange}             
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Birthday</label>
              <input
                type="date"
                className="form-control mt-1"
                placeholder="Enter Birth Day" 
                name="dob"   
                onChange={handleChange}            
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Mobile</label>
              <input
                type="number"
                className="form-control mt-1"
                placeholder="Enter Mobile Number" 
                name="mobile" 
                onChange={handleChange}              
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter New password"  
                name="password"       
                onChange={handleChange}       
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Comfirm Password</label>
              <input
                type="password"
                className="form-control mt-1"
                name="repassword"
                placeholder="Re Enter password" 
                onChange={handleChange}       
                required           
               
              />
            </div>
            <br></br>

            {error &&
            <div class="alert alert-danger" role="alert">
            {error}
            </div>
            }

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
        
          </div>
        </form>
      </div>
    )
};

export default CompleteProfile;