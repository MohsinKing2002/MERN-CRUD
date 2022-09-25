import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, loadUser, logoutUser } from '../Actions/User';
import { Loader } from "./Utils/Loader";
import { BiUserPin, BiEnvelope, BiCheckShield } from "react-icons/bi";
import { ImMobile2 } from "react-icons/im";

function Profile() {
    const dispatch = useDispatch();
    const {user, loading, message, error} = useSelector(state=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(loadUser());
    }, [dispatch]);

    const handleLogout = (e)=>{
        if(window.confirm("Are you sure want to ?")){
            dispatch(logoutUser());
            dispatch(loadUser());
        }
    }

    const handleDelete = (e)=>{
        if(window.confirm("Are you sure want to ?")){
            dispatch(deleteProfile());

            navigate("/register");
        }
    }

    useEffect(() => {
        if(message){
            toast.success(message);
            dispatch({
                type:"clearMessage"
            })
        }

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, message, error]);

    return loading ? <Loader /> : (
        <Card className="card profile">
            <Card.Body>
                <div className="user_details">
                    <span style={{textAlign: "center"}}>
                        <img style={{ marginBottom: "15px", height: "15vh", borderRadius: "100%" }} src={user && user.avatar.url} alt="avatar" />
                        <span className="profile_user user">
                            <BiUserPin className="user_icon" />
                            <h3> {user && user.name} </h3>
                        </span>

                        <span className="profile_user user">
                            <BiEnvelope className="user_icon" />
                            <h3> {user && user.email} </h3>
                        </span>

                        <span className="profile_user user">
                            <ImMobile2 className="user_icon" />
                            <h3> {user && user.phone} </h3>
                        </span>

                        <span className="profile_user user">
                            <BiCheckShield className="user_icon" />
                            <h3> {user && user.role} </h3>
                        </span>
                    </span>
                </div>
            </Card.Body>

            <Card.Body>
                <h3 className="title">Controlls..</h3>
                <br />
                <div className="user_controll">
                    <Button disabled={loading} onClick={handleLogout} className="btn" variant="warning">Log out</Button>
                    <Button disabled={loading} className="btn" variant="primary"> <NavLink className="link" to="/update">Update Profile</NavLink> </Button>
                    <Button disabled={loading} onClick={handleDelete} className="btn" variant="danger">Delete Profile</Button>
                    <Button disabled={loading} className="btn" variant="info"> <NavLink className="link" to="/contact">Contact us</NavLink> </Button>
                </div>
            </Card.Body>
            
        </Card>
    );
}

export default Profile;