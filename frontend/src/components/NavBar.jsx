import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {
   
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
        <li class="nav-item">
          <a class="nav-link"  href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/adduser">Add User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/userlist">View User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/addnote">Add Note</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/notelist">View Notes</a>
        </li>
      </ul>
      <form class="d-flex">
       
        <button class="btn btn-primary" type="button">Logout</button>
      </form>
    </div>
  </div>
</nav> 
        </div>

    )
};

export default Navbar;