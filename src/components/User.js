import React , { useState, useEffect }from 'react'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const User = ({show, setShow, setUserData}) => {
    const handleClose = () => setShow(false);

    const [user, setUser] = useState({name:"", email:""});
    const navigate = useNavigate();

    const getUser = async(id)=> {
      const response = await fetch(`http://localhost:5000/api/auth/getuser/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }          
    });
      const json = await response.json();
      setUser({name: json.user.name, email: json.user.email});
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
          getUser();
      }else{
          navigate('/login');
      }
      // eslint-disable-next-line
  }, [])

  useEffect(()=> {
    setUserData({name: user.name});
  }, [user])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Name: {user.name}</Modal.Body>
        <Modal.Body>Email: {user.email}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default User
