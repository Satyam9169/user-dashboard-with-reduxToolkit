import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from "./component/Firebase/Firebase";
import Logout from "./component/Logout/Logout";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Navigation from './component/Navigation/Navigation'
import Home from "./component/Home/Home";
import ResetPassword from './component/ResetPassword/ResetPassword'
import Create from "./component/Create/Create";
import ReadComponent from "./component/Read/ReadComponent"
import Update from "./Update/Update";
import Search from './component/Search/Search';

const App = () => {
  const [user, setUser] = useState(null);
  const [justRegistered, setJustRegistered] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (justRegistered) {
        setJustRegistered(false);
      }
    });
    return () => unsubscribe();
  }, [justRegistered]);

  return (
    <div>
      <Navigation user={user} />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register setJustRegistered={setJustRegistered} />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<ReadComponent />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default App;

