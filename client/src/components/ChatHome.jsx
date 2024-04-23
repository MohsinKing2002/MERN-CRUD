import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUser } from "../Actions/User";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "./Utils/Loader";

function ChatHome() {
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    navigate("/chat", { state: { name } });
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default ChatHome;
