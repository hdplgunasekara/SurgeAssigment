
const Logout = () => {

    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("permissionlevel");
    window.location.href = "/login";
   
    
};

export default Logout;