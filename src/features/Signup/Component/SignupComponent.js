import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FormGroup, Input, Label } from 'reactstrap';
import { signupApi, uploadProfileImageApi } from '../Service/ApiHandler';

// SignUp Component

const SignupComponent = () => {
    
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [ack, setAck] = useState({
        message: '',
        status: false
    });

    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Weblog - Signup';
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({...user, [name] : value})
    }

    const handleUploadImage = (event) => {
        console.log('Profile Image - ');
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user);

        signupApi(user).then((resp) => {

            // Upload Image During Creating New User
            uploadProfileImageApi(image, resp.id).then(img => {
                console.log('Profile Image Uploaded!!');
                console.log(img);
            }).catch(err => {console.log('Error in Uploading Image - ' + err);})

            console.log('Response From Handler - ');
            console.log(resp);
            setAck({message:resp.message, status:resp.status});
            toast.success(`${user.name} you are registered successfully!!`);
            navigate("/login");
        }).catch((err) => {
            console.log(err.response.data);
            setAck({message:err.response.data.message, status:err.response.data.status})
            console.log('Error!!!!!!!!!');
            toast.error('Error in registration!! Please check.');
        })


    }

    const handleReset = () => {
        setUser({
            name: '',
            email: '',
            password: ''
        })
        setAck('');
    }

  return (
    <div className="signupContainer border w-50 p-3 text-justify bg-dark text-light" style={{marginTop:"150px",marginLeft:"350px", borderRadius:"10px"}}>
        <h3 className="heading text-center">Signup</h3>
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="InputEmail">Name</Label>
                <Input type="text" className="form-control" id="inputEmail" name="name" value={user.name} onChange={handleChange} placeholder="Enter name" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="inputEmail">Email address</Label>
                <Input type="text" className="form-control" id="inputEmail" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="inputPassword">Password</Label>
                <Input type="password" className="form-control" id="inputPassword" name="password" value={user.password} onChange={handleChange} placeholder="Enter password" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor='inputImage'>Upload Profile Image</Label>
                <Input type="file" className="form-control" id="inputImage" name="password" onChange={handleUploadImage} />
            </FormGroup>
            
            <button type="submit" className="btn btn-primary mx-3">Register</button>
            <button type="reset" className="btn btn-secondary mx-3" onClick={handleReset}>Reset</button>
        </form>
      
    </div>
  )
}

export default SignupComponent
