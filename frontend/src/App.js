import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/main/Login";
import Logout from "./pages/main/Logout";
import Notes from "./pages/student/Notes";
import Users from "./pages/admin/Users";
import CompleteProfile from "./pages/main/CompleteProfile";
import AddUser from "./pages/admin/AddUser";
import AddNote from "./pages/student/AddNote";
import Nav from "./components/NavBar"
import PrivateRouteAdmin from "./Auth/PrivateRouteAdmin";
import PrivateRouteStudent from "./Auth/PrivateRouteStudent";
import PrivateRouteMain from "./Auth/PrivateRouteMain";




function App() {


  return (
    <div className="App">
      <Nav />
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route exact path="/admin" element={<PrivateRouteAdmin />}>
            <Route exact path="/admin/userlist" element={<Users />} />
            <Route exact path="/admin/adduser" element={<AddUser />} />
          </Route>

        {/* Student routes */}
          <Route exact path="/student" element={<PrivateRouteStudent/>}>
          <Route exact path="/student/notelist" element={<Notes />} />
          <Route exact path="/student/addnote" element={<AddNote />} />
          </Route>
          
        {/* Unprotected routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />

        
        {/* completeprofile route */}
          <Route exact path="/completeprofile" element={<PrivateRouteMain/>}>
          <Route exact path="/completeprofile/:id" element={<CompleteProfile />} />
          </Route>

         {/* 404 page */}
        <Route path="*" element={<Login />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
