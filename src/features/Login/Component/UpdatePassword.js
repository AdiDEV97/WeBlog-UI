import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updatePasswordApi } from '../Service/ApiHandler';

// Update Password Compoenent

const UpdatePassword = () => {

    const [UpdateCredentials, setUpdateCredentials] = useState({
        email : '',
        newPassword : ''
    })

    const [confirmPassword, setConfirmPassword] = useState({
        password : ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Weblog - Forgot Password';
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUpdateCredentials({...UpdateCredentials, [name] : value});
    }

    const handleConfirmPassword = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setConfirmPassword({...confirmPassword, [name]: value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Cred - ');
        console.log(UpdateCredentials);
        console.log('=============================================');
        console.log('Confirm - ');
        console.log(confirmPassword);
        
        if(UpdateCredentials.newPassword === confirmPassword.password) {

            // console.log('Password - ');
            // console.log(confirmPassword);

            console.log('Password Matched!!');
            updatePasswordApi(confirmPassword, UpdateCredentials.email).then((resp) => {
                console.log('Password Updated!!');
                console.log(resp);
                
                
            }).catch(err => {
                toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
            navigate('/login');
            toast.success("Password Updated!!", { position: toast.POSITION.BOTTOM_CENTER });
        }
        else {
            console.log('Password Not Matched!!');
            toast.error("Password not matched!!", { position: toast.POSITION.BOTTOM_CENTER });
        }
    }

    const handleReset = () => {
        setUpdateCredentials({
            email : '',
            newPassword : ''
        })
        setConfirmPassword({password: ''})
    }

  return (
    <div className="loginContainer border w-50 p-3 text-justify bg-dark text-light" style={{marginTop:"150px",marginLeft:"350px", borderRadius:"10px"}}>
      <h3 className="heading text-center">Update Password</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={UpdateCredentials.email} onChange={handleChange} placeholder="Enter your valid Email Address" autoComplete='off'/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">New Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="newPassword" value={UpdateCredentials.newPassword} onChange={handleChange} placeholder="Enter new password" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirm New Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={confirmPassword.password} onChange={handleConfirmPassword} placeholder="Confirm new password" />
            </div>

            <button type="submit" className="btn btn-primary">Update Password</button>
            <button type="reset" className="btn btn-secondary mx-3" onClick={handleReset}>Reset</button>
        </form>
    </div>
  )
}

export default UpdatePassword
