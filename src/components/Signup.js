import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword: ""});
    let naviagate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()

        if(json.success){
            // localStorage.setItem('token', json.authtoken)
            props.showAlert("Successfully registered user", "success");
            naviagate('/login');
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-2">
      <h2>Sign up to create an account.</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} name="name" id="name" minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onChange} name='email' id="email" aria-describedby="emailHelp" required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} name='password' id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" minLength={5} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
