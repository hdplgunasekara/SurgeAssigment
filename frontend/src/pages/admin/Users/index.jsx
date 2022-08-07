import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./user.styles.css";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { useEffect } from "react";
import Usermodal from '../../../components/models/UserModel'

const User = () => {
    const [items,setItems]= useState([]);
    const [pageCount,setpageCount]= useState(0);

    useEffect(()=>{
    const getUsers = async()=>{
    const res= await fetch(
        'http://127.0.0.1:8090/user/users'
    );
    const data = await res.json();
    // const total = res.headers.get('x-total-count');
    setpageCount(10);

    setItems(data);
    };

    getUsers();


    },[]);

    const fetchUsers = async  (currentPage)=>{
        const res = await fetch(
            `http://127.0.0.1:8090/user/users?page=${currentPage}&limit=1`
        );
        const data = await res.json();
        return data;

    };

    const handlePageClick = async (data)=>{

        let currentPage = data.selected+1;

        const userFormServer = await fetchUsers(currentPage);

        setItems(userFormServer);
    }
   
    return (
        <div className="User">

        <center><h2>Users List</h2></center>
        
        <div className="User-container">

        <div className="Search-container">
        <nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search By ID" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

<nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search By Name" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

<nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search By Email" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

        </div>
            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th> 
                        <th scope="col">Mobile</th>                       
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(user => <tr key={user._id}>

                         <th scope="row">{user._id}</th>

                            <td>{user.firstname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td className='action-buttons'>
                                <center>
                                <Usermodal id={user._id} fname={user.firstname} lname={user.lastname} email={user.email} mobile={user.mobile} />
                                </center>
                               </td>
                        </tr>
                    )}
                        
                        
                      

                </tbody>
            </table>
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