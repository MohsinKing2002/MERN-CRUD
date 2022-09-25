import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../Actions/User';
import { toast } from "react-toastify";
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading, message, error} = useSelector(state=>state.user);

  const [user, setUser] = useState({
    email: "", password: ""
  })

  let name, value;
  const handleInputs = (e)=>{
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]: value});
  }

  const handleLogin = async(e)=>{
    e.preventDefault();

    await dispatch(loginUser(user.email, user.password));
    navigate("/");
  }
  

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessages"
      })
    }

    if (error) {
      toast.error(error);
      dispatch({
        type: "clearErrors"
      })
    }
  }, [dispatch, message, error]);


  return (
    <Card className="card">
      <Card.Body>
        <h2 className='title'>Sign in..</h2>
        <br />
        <form >

            <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder='Enter Your email..' required />
            <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder='Enter Your password..' required />

            <br />
            <Button disabled={!user.email || !user.password || loading} onClick={handleLogin} type="submit" variant="primary">Log in</Button>
        </form>
        <NavLink style={{marginTop: "15px", textAlign: "center"}} className="nav-link" to="/register">Don't have account..</NavLink>
      </Card.Body>
    </Card>
  );
}

export default Login;