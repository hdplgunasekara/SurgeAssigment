import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import  "./adduser.styles.css";
import requestConfigJson from "../../../context/ConfigJson";
import { LoadingOverlay } from '@mantine/core';


const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    setError("");
    setMsg("");
    
  }

	const handleSubmit = async (e) => {
    setIsLoading(true)
		e.preventDefault();
		try {
			const url = "http://127.0.0.1:8090/user/register";
			const { data: res } = await axios.post(url,{email:email},requestConfigJson);
      setError("");
			setMsg(res.message);
      setEmail("");
      setIsLoading(false)

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        setMsg("");
				setError(error.response.data.message);
        setIsLoading(false)
			}
		}
	};

    return (

      <div className="Auth-form-container">
         <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Add User</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChange}
                value={email}
                required
              />
            </div>
            {error && <p>{error}</p>}
            {msg && <p>{msg}</p>}
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

export default AddUser;