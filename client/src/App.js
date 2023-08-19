import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Admin from "./components/Admin/Admin";
import { auth } from "./firebase";

import "./App.css";

function App() {
  const [userName, setUserName] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setUserName(user);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/user" element={<Layout name={userName} />}>
            <Route path="home" element={<Home name={userName} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
