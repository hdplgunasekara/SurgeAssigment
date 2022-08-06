import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./notes.styles.css";

const Notes = () => {
   
    return (
        <div className="Notes">

        <center><h2>My Notes List</h2></center>
        
        <div className="Notes-container">

        <div className="Search-container">
        <nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

<nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

<nav class="navbar navbar-light bg-light">
         <div class="container-fluid">
          <form class="d-flex">
       <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

        </div>
            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>                       
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                         <th scope="row">11</th>

                            <td>title 1</td>
                            <td>description</td>
                            <td className='action-buttons'>
                                <center>
                                <button  type="button" class="btn btn-success me-2">View</button>
                                <button  type="button" class="btn btn-primary me-2">Update</button>
                                <button  type="button" class="btn btn-danger me-2">Delete</button>
                                </center>
                                {/* <button type="button" class="btn btn-info button3 me-2">View</button> */}
                                {/* <SupplierQuotationModal qid={supplierquotaton._id} qitem={supplierquotaton.item} qprice={supplierquotaton.price} qquantity={supplierquotaton.quantity}/> */}
                            </td>
                        </tr>
                        
                        
                      

                </tbody>
            </table>
           </div>
        </div>

    )
};

export default Notes;