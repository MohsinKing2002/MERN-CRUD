import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../Actions/User';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, message, error} = useSelector(state=>state.user);

    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: ""
    });
    const [avatar, setAvatar] = useState("");

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    }

    const handleAvatar = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }
    }

    const handleRegister = async(e)=>{
        e.preventDefault();

        await dispatch(registerUser(user.name, user.email, user.phone, user.password, avatar));
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
            navigate("/");
        }

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, message, error, navigate]);

    return (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Sign up..</h2>
                <br />
                <form >
                    { avatar ? <img style={{height: "7vh"}} src={avatar} alt="avatar" /> : null }

                    <input type="file" accept="image/*" onChange={handleAvatar} required />
                    <input type="text" name='name' value={user.name} onChange={handleInputs} placeholder="Enter your name.." required />
                    <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder="Enter Your email.." required />
                    <input type="text" name="phone" value={user.phone} onChange={handleInputs} placeholder="Enter Your phone.." required />
                    <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Enter Your password.." required />

                    <br />
                    <Button disabled={!user.name || !user.email || !user.phone || !user.password || !avatar || loading} onClick={handleRegister} type="submit" variant="primary">Register</Button>
                </form>
                <NavLink style={{ marginTop: "15px", textAlign: "center" }} className="nav-link" to="/">Already have an account..</NavLink>
            </Card.Body>
        </Card>
    );
}

export default Register;