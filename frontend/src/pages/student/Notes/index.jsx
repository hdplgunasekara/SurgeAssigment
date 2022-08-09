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
import requestConfigJson from "../../../context/ConfigJson";

const Notes = () => {
    const [items,setItems]= useState([]);
    const [pageCount,setpageCount]= useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
    const getNotes = async()=>{
    setIsLoading(true);
    const res= await fetch(
        `http://127.0.0.1:8090/usernote/notes?userid=${localStorage.getItem("id")}`,
        requestConfigJson
    );
    setIsLoading(false);
    const data = await res.json();
    setpageCount(data.count+1);
    setItems(data.data);
    };

    getNotes();


    },[]);

    const fetchNotes = async  (currentPage)=>{
        setIsLoading(true);
        const res = await fetch(
            `http://127.0.0.1:8090/usernote/notes?userid=${localStorage.getItem("id")}&page=${currentPage}&limit=1`,
            requestConfigJson
        );
        const data = await res.json();
        setIsLoading(false);
        return data;

    };

    const handlePageClick = async (data)=>{

        let currentPage = data.selected+1;

        const notesFormServer = await fetchNotes(currentPage);

        setItems(notesFormServer.data);
    }

    const noteDelete=async(id)=>{
        try {
       const url = `http://127.0.0.1:8090/usernote/deletenote/${id}`;
        await axios.put(url,requestConfigJson).then(res=>{
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
            )

        } catch (error) {
			alert("Failed")
		}
      };
   
    return (

        <div className="Notes">
   
        <LoadingOverlay visible={isLoading} overlayBlur={2} />      

        <center><h2>My Notes List</h2></center>
        
        <div className="Notes-container">
            <table class="table table-striped styled-table ">
                <thead class="thead-dark" >
                    <tr>
                        
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>                       
                        <th scope="col"><center>Actions</center></th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(note => <tr key={note._id}>
                       <td>{note.title}</td>
                            <td>{note.description}</td>
                            <td className='action-buttons'>
                                <center>
                                <Notemodal id={note._id} title={note.title} description={note.description}  />
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