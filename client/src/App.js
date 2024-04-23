import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./components/AboutPage";
import Contact from "./components/Contact";
import Message from "./components/Message";
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Update from "./components/Update";
import ErrorPage from "./components/Utils/ErrorPage";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Search from "./components/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Header />

      <div className="center">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/update"
            element={isAuthenticated ? <Update /> : <Login />}
          />
          <Route
            path="/account"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path="/message"
            element={isAuthenticated ? <Message /> : <Login />}
          />
          <Route
            path="/contact"
            element={isAuthenticated ? <Contact /> : <Login />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default App;
