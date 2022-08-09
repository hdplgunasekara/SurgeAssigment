import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./user.styles.css";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { useEffect } from "react";
import Usermodal from '../../../components/models/UserModel'
import requestConfigJson from "../../../context/ConfigJson";
import { LoadingOverlay } from '@mantine/core';

const User = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [items,setItems]= useState([]);
    const [pageCount,setpageCount]= useState(0);
    const [search,setSearch]= useState("");
    


    useEffect(()=>{

    setIsLoading(true)
    const getUsers = async()=>{
    const res= await fetch(
        'http://127.0.0.1:8090/user/users',requestConfigJson
    );
    const data = await res.json();
    setpageCount(2);
    setItems(data);
   
    };

    getUsers();
    setIsLoading(false)

    },[]);

    const fetchUsers = async  (currentPage)=>{ 
        setIsLoading(true)
        const res = await fetch(
            `http://127.0.0.1:8090/user/users?page=${currentPage}&limit=1&search=${search}`
            ,requestConfigJson
        );
        const data = await res.json();
        setIsLoading(false)
        return data;
    };

    const handlePageClick = async (data)=>{
        let currentPage = data.selected+1;
        const userFormServer = await fetchUsers(currentPage);
        setItems(userFormServer);
    }

    const handleChangeSearch = async (event) => {
        setSearch(event.target.value);  
        const userFormServer = await fetchUsers(1);
        setItems(userFormServer); 
      }

   
    
    return (
        <div className="User">
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <center><h2>Users List</h2></center>
        
        <div className="User-container">

        <div className="Search-container">
        <nav className="navbar navbar-light bg-light">
         <div className="container-fluid">
          <form className="d-flex" >
       <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
       onChange={handleChangeSearch}
       required/>
    </form>
  </div>
</nav>
      </div>

          {items!=""? (
        <table className="table table-striped styled-table ">
                <thead className="thead-dark" >
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th> 
                        <th scope="col">Mobile</th>                       
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>
                  

                    {items.map(user => <tr key={user._id}>

                         <th scope="row">{user._id}</th>

                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td className='action-buttons'>
                                <center>
                                <Usermodal id={user._id} fname={user.firstname} lname={user.lastname} email={user.email} mobile={user.mobile} dob={user.dateofbirth} />
                                </center>
                               </td>
                        </tr>
                    )}
                        
                        
                      

                </tbody>
            </table>
            	
				) : (
                    <div className="alert alert-warning" role="alert">
                    No Result Found!!
                    </div>
          				
			)}
           </div>
           <ReactPaginate
           breakLabel={'...'}
           pageCount={pageCount}
           onPageChange={handlePageClick}
           containerClassName={'pagination justify-content-center'}
           pageClassName={'page-item'}
           pageLinkClassName={'page-link'}
           previousClassName={'page-item'}
           nextClassName={'page-item'}
           previousLinkClassName={'page-link'}
           nextLinkClassName={'page-link'}
           breakClassName={'page-item'}
           breakLinkClassName={'page-link'}
           activeClassName={'page-item active'}

           />
        </div>


    )
};

export default User;