import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginInput } from '../../components/customComponents/inputs/Input'
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../services/authServices/AuthServices';
import jwt_decode from "jwt-decode";



const Login = () => {

    const { auth,setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";


let [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
  
    setCredentials((prevalue) => {
      return {
        ...prevalue,                
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
        email : credentials.email,
        password :credentials.password
    };
    console.log("payload",payload)
    try {
      const { data: fetchLoginResponses, status } = await loginUser(payload);
      if(fetchLoginResponses.message==="login successfully"){
        var decoded = jwt_decode(fetchLoginResponses.accessToken);
        const email = decoded.email
        let cat = decoded.user_category.split(",");
         cat = cat.map(Number);

        setAuth({user:email,roles:cat,accessToken:fetchLoginResponses.accessToken})
        

        console.log("auth",cat)
        let value = cat[1]
        
        navigate(from, {replace:true});
        
      }
      
      
    } catch (error) {

      console.log(error)
      
    }
   


   


  }

  return (
    <div id="auth">
        
    <div class="row h-100">
        <div class="col-lg-5 col-12">
            <div id="auth-left">
                <div class="auth-logo">
                    <a href="index.html"><img src="assets/images/logo/little.svg" alt="Logo"/></a>
                </div>
                <h1 class="auth-title">Log in.</h1>
                <p class="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>
    
                <form onSubmit={handleSubmit}>
                    <div class="form-group position-relative has-icon-left mb-4">
                        <LoginInput 
                              onChange={handleChange}
                              //value={}
                              name= "email"
                              id= "email"
                              InputType="text"
                              placeholder="email"

                        />
                        <div class="form-control-icon">
                            <i class="bi bi-person"></i>
                        </div>
                    </div>
                    <div class="form-group position-relative has-icon-left mb-4">
                         <LoginInput 
                              onChange={handleChange}
                              //value={}
                              name= "password"
                              id= "password"
                              InputType="password"
                              placeholder="Password"

                        />
                        <div class="form-control-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                    </div>
                    <button type='submit' class="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
                </form>
                <div class="text-center mt-5 text-lg fs-4">
                    <p class="text-gray-600">Don't have an account? <a href="auth-register.html" class="font-bold">Sign
                            up</a>.</p>
                    <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
                </div>
            </div>
        </div>
        <div class="col-lg-7 d-none d-lg-block">
            <div id="auth-right">
    
            </div>
        </div>
    </div>
    
        </div>
  )
}

export default Login