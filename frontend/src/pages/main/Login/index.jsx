import React, { useContext } from "react";
import { useState } from "react";
import { Link} from "react-router-dom";
import  "./login.styles.css";
import UserContext from "../../../context/UserContext";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);  
  
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);  

  }


  const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8090/user/login";
			const { data: res } = await axios.post(url, {email:email,password:password});
			localStorage.setItem("accesstoken", res.accesstoken);
      localStorage.setItem("refreshtoken", res.refreshtoken);
      localStorage.setItem("id", res.id);
      localStorage.setItem("email", res.email);
      
      if(!res.status){
        window.location = "/adduser";
      }else{
      
      if(res.permissionlevel==='Student'){
        
        window.location = "/notelist";
      }

      if(res.permissionlevel==='Admin'){
        
        window.location = "/userlist";
      }
    }

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				alert(error.response.data.message);
			}
		}
	};
  
   
    return (

      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChangePassword}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
};

export default Login;