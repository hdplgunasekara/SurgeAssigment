import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  "./notes.styles.css";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { useEffect } from "react";
import Notemodal from '../../../components/models/NoteModel'
import axios from 'axios';
import swal from 'sweetalert'
import { LoadingOverlay } from '@mantine/core';

const Notes = () => {
    const [items,setItems]= useState([]);
    const [pageCount,setpageCount]= useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
    const getNotes = async()=>{
    setIsLoading(true);
    const res= await fetch(
        'http://127.0.0.1:8090/usernote/notes'
    );
    setIsLoading(false);
    const data = await res.json();
    const total = res.headers.get('x-total-count');
    setpageCount(total+2);

    setItems(data);
    };

    getNotes();


    },[]);

    const fetchNotes = async  (currentPage)=>{
        const res = await fetch(
            `http://127.0.0.1:8090/usernote/notes?page=${currentPage}&limit=1`
        );
        const data = await res.json();
        return data;

    };

    const handlePageClick = async (data)=>{

        let currentPage = data.selected+1;

        const notesFormServer = await fetchNotes(currentPage);

        setItems(notesFormServer);
    }

    const noteDelete=(id)=>{
       
        axios.put(`http://127.0.0.1:8090/usernote/deletenote/${id}`).then(res=>{
        swal({
            title: "Success!",
            text: "Note Deleted Successfully",
            icon: 'warning',
            timer: 2000,
            button: false,
          })
          .then(function(){
            window.location.reload();
          })
         
        }
        ).catch(err=>{
           alert("Error")
        });
        
      };
   
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

                    {items.map(note => <tr key={note._id}>

                         <th scope="row">11</th>

                            <td>{note.title}</td>
                            <td>{note.description}</td>
                            <td className='action-buttons'>
                                <center>
                                <Notemodal id={note._id} title={note.title} description={note.description}  />
                                {/* <button  type="button" class="btn btn-primary me-2">Update</button> */}
                                <button  type="button" class="btn btn-danger me-2" onClick={() => { noteDelete(note._id) }}>Delete</button>
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

export default Notes;