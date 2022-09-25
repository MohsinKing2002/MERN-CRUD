import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { contactMessage, loadUser} from '../Actions/User';
import { Loader } from './Utils/Loader';

function Contact() {

    let [message, setMessage] = useState();

    const dispatch = useDispatch();
    const {user, message: userMessage, error, loading} = useSelector(state=>state.user);
    const navigate = useNavigate();

    const handleContact = async(e)=>{
        e.preventDefault();

        await dispatch(contactMessage(message));
        navigate("/account");
    }

    useEffect(() => {
        dispatch(loadUser());

        if (userMessage) {
            toast.success(userMessage);
            dispatch({
                type: "clearMessage"
            })
        }

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, userMessage, error]);


    return loading ? <Loader/> : (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Contact us..</h2>
                <br />
                <form >
                    <input type="text" name="name" value={user && user.name} placeholder='Enter Your name..' required />
                    <input type="email" name="email" value={user && user.email} placeholder='Enter Your email..' required />

                    <textarea name="message" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Enter Your message.." required></textarea>
                    <Button disabled={loading} onClick={handleContact} type="submit" variant="primary">Submit</Button>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Contact;