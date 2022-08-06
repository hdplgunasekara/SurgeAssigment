import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/main/Login";
import NavBar from "./components/NavBar";
import Notes from "./pages/student/Notes";
import Users from "./pages/admin/Users";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<NavBar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/userlist" element={<Users />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
