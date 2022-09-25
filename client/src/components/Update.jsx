import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../Actions/User';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Update() {
    const dispatch = useDispatch();
    const {message, loading, error} = useSelector(state=>state.user);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", email: "", phone: ""
    })

    const [avatar, setAvatar] = useState("");

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value})
    }

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }
    }

    const handleUpdate = async(e)=>{
        e.preventDefault();

        await dispatch(updateProfile(user.name, user.email, user.phone, avatar));
        navigate("/account");
    }

    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({
                type: "clearMessages"
            })
        }

        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, message, error]);

    return (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Edit info..</h2>
                <br />
                <form >
                    {avatar ? <img style={{ height: "7vh" }} src={avatar} alt="avatar" /> : null}
                    <input type="file" accept="image/*" onChange={handleAvatar} />

                    <input type="text" name="name" value={user.name} onChange={handleInputs} placeholder='Enter Your name..' />

                    <input type="email" name="email" value={user.email} onChange={handleInputs} placeholder='Enter Your email..' />

                    <input type="text" name="phone" value={user.phone} onChange={handleInputs} placeholder='Enter Your phone..' />

                    <br />
                    <Button disabled={loading} onClick={handleUpdate} type="submit" variant="primary">Update</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Update;