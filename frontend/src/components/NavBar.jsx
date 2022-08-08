import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {

console.log(localStorage.getItem("accesstoken") && localStorage.getItem("status"));

  const logout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("permissionlevel");
    window.location.href = "/login";
	};
   

 
    return (
        <div>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">SURGE ASSIGNMENT</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">

        {/* Admin Menu */}
					{localStorage.getItem("permissionlevel") === "Admin" && localStorage.getItem("status")==='true'? (
					<>
        <li class="nav-item">
          <a class="nav-link" href="/admin/adduser">Add User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/admin/userlist">View User</a>
        </li>
        </>
            					
					) : (
						<li></li>
					)}

          {/* Student Menu */}
					{localStorage.getItem("permissionlevel") === "Student" && localStorage.getItem("status")==='true'? (
					<>
       <li class="nav-item">
          <a class="nav-link" href="/student/addnote">Add Note</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/student/notelist">View Notes</a>
        </li>
        </>
            					
					) : (
						<li></li>
					)}


        </ul>

        {localStorage.getItem("accesstoken") && localStorage.getItem("status")==='true'? (
					<form class="d-flex">     
          <button class="btn btn-primary" type="button" onClick={logout} >Logout</button>
           </form>
				) : (

          <form class="d-flex">     
          <a href='/login' class="btn btn-primary" >Login</a>
          </form>
					
				)}
       
        
     
      {/* <form class="d-flex">
       
        <button class="btn btn-primary" type="button">Logout</button>
      </form> */}
    </div>
  </div>
</nav> 
        </div>

    )
};

export default Navbar;