
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../Actions/User';
import { toast } from "react-toastify";
import { Loader } from './Utils/Loader';

function Search() {
    const [name, setName] = useState();
    const dispatch = useDispatch();
    const {users, loading, error} = useSelector(state=>state.allUsers);

    const handleSearch = async(e)=>{
        e.preventDefault();

        await dispatch(getAllUsers(name));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch({
                type: "clearErrors"
            })
        }
    }, [dispatch, error, name])

    return loading ? <Loader/> : (
        <Card className="card">
            <Card.Body>
                <h2 className='title'>Search User..</h2>
                <br />
                <form >

                    <input type="text" name="name" value={name} onChange={(e)=>(setName(e.target.value))} placeholder='User Name..' required />

                    <br />
                    <Button onClick={handleSearch} disabled={loading} type="submit" variant="primary">Search </Button>
                </form>
                <div className="search_users users">

                    {
                        users && users.length > 0 ? users.map((user) => (
                            <span key={user._id} className="user">
                                <img src={user && user.avatar.url} alt="avatar" />
                                <h3> {user && user.name} </h3>
                            </span>
                        )) : "No user found !!"
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

export default Search;