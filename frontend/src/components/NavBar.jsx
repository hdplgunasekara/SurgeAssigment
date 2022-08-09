import React from "react";


import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {



  const logout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("permissionlevel");
    localStorage.removeItem("status");
    window.location.href = "/login";
	};
   

 
    return (
        <div>

<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
  <div className="container-fluid">
    <a className="navbar-brand" href="javascript:void(0)" data-testid="logo-text">SURGE ASSIGNMENT</a>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto">

        {/* Admin Menu */}
					{localStorage.getItem("permissionlevel") === "Admin" && localStorage.getItem("status")==='true'? (
					<>
        <li className="nav-item">
          <a className="nav-link" href="/admin/adduser">Add User</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/userlist">View User</a>
        </li>
        </>
            					
					) : (
						<li></li>
					)}

          {/* Student Menu */}
					{localStorage.getItem("permissionlevel") === "Student" && localStorage.getItem("status")==='true'? (
					<>
       <li className="nav-item">
          <a className="nav-link" href="/student/addnote">Add Note</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/student/notelist">View Notes</a>
        </li>
        </>
            					
					) : (
						<li></li>
					)}


        </ul>

        {localStorage.getItem("accesstoken") && localStorage.getItem("status")==='true'? (
					<form className="d-flex">     
          <button className="btn btn-primary" type="button" onClick={logout} >Logout</button>
           </form>
				) : (

          <form className="d-flex">     
          <a href='/login' className="btn btn-primary" data-testid="login-btn">Login</a>
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