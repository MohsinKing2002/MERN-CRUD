import Card from 'react-bootstrap/Card';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import {useDispatch, useSelector } from "react-redux";
import { getAllUsers, loadUser } from '../Actions/User';
import { Loader } from './Utils/Loader';

function Home() {

    const dispatch = useDispatch();
    const {user, loading, error} = useSelector(state=>state.user);
    const { users, loading: userLoading, error: userError } = useSelector(state => state.allUsers);


    useEffect(()=>{
        async function getUser(){
            await dispatch(loadUser());
        }

        getUser();

        dispatch(getAllUsers());

        if (error) {
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }

        if (userError) {
            toast.error(userError);
            dispatch({
                type: "clearErrors"
            })
        }

    }, [dispatch, error, userError]);

    return loading === true || userLoading === true ? <Loader/> : (
        <Card style={{width: "85%"}} className="card profile">
            <div className="home_greet">
                <Card.Body>
                    <Card.Text className="para greet">
                        Hello, <br />
                        Mr/Mrs. <span style={{ fontWeight: "600" }}> {user && user.name} </span> <br />
                        welcome to our MERN CRUD application. <br /> <br />

                        <Card.Text className="para greet">
                            CRUD stands for realtime Create, Read, Update, and Delete.
                        </Card.Text>
                        <Card.Text className="para greet">
                            I have used the MERN (MongoDB, Express-js, React-js, and Node-js) stack, React-Bootstrap, Toastify, Redux-Toolkit etc to develop this application. <br /> <br />
                            It's one of my project for resume to show my full stack development skill.
                        </Card.Text>
                        <Card.Text className="para greet">
                            Thanks for your valueable time.. take love. :) <br />
                            Yours loving....
                        </Card.Text>
                        <span style={{ fontWeight: "600" }}>Mohsin King</span> <br />
                    </Card.Text>
                </Card.Body>
            </div>

        <div className="home_users" >
            <Card.Body>
                <h3 className="title">All Users..</h3>
                <br />
                <div className="users">

                {
                    users && users.length > 0 ? users.map((user)=>(
                        <span key={user._id} className="user">
                            <img src={user && user.avatar.url} alt="avatar" />
                            <h3> {user && user.name} </h3>
                        </span>
                    )) : "No user found !!"
                }
                </div>
            </Card.Body>
        </div>
        </Card>
    );
}

export default Home;