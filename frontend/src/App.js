import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/main/Login";
import NavBar from "./components/NavBar";
import Notes from "./pages/student/Notes";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import AddNote from "./pages/student/AddNote";
import Nav from "./components/NavBar"

function App() {
  return (
    <div className="App">
  <Nav/>
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/notelist" element={<Notes />} />
        <Route path="/userlist" element={<Users />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addnote" element={<AddNote />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
