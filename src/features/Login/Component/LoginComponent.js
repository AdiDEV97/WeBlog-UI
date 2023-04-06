import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doLogin, getCurrentUserDetails } from '../../../Auth';
import { loginApi } from '../Service/ApiHandler';

const LoginComponent = () => {
    const [userCred, setUserCred] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        document.title = 'Weblog - Login';
    }, []);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserCred({...userCred, [name] : value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userCred);

        loginApi(userCred).then((resp) => {
            console.log('Login Response');
            console.log(resp);

            // Save the data to the localStorage
            doLogin(resp, () => {
                console.log('Login detail is stored in localStorage.');
                //navigate('/user/dashboard');
                window.location.replace(`${BASE_URL}/home`);
                //window.location.reload();
                //toast.success("Login Successfull!!", {position: toast.POSITION.BOTTOM_CENTER});
            })
            
            
            }).catch(err => {
                console.log('Error');
                console.log(err);
                toast.error("Invalid Credentials!!");
            })

    }

    const handleReset = () => {
        setUserCred({
            username: '',
            password: ''
        })
    }

  return (
    <div className="loginContainer border w-50 p-3 text-justify bg-dark text-light" style={{marginTop:"150px",marginLeft:"350px", borderRadius:"10px"}}>
        <h3 className="heading text-center">Login</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="username" value={userCred.username} onChange={handleChange} placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userCred.password} onChange={handleChange} placeholder="Enter password" />
            </div>

            <div className='my-3'><Link to="/change-password">Forgot Password?</Link></div>
            
            <button type="submit" className="btn btn-primary mx-3">Login</button>
            <button type="reset" className="btn btn-secondary mx-3" onClick={handleReset}>Reset</button>
        </form>
      
    </div>
  )
}

export default LoginComponent
