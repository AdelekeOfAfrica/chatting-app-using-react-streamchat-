
import React,{useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullname:'',
    username:'',
    password:'',
    confirmpassword:'',
    phonenumber:'',
    avatarurl:'',
  
  };

const Auth = () => {
    const [form,setForm]=useState(initialState);
    const [isSignup,setIsSignup] = useState(true);
   
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]: e.target.value});
        
      };

      const handleSubmit = async (e) =>{
        e.preventDefault();
       
        const {fullname,username,password,phonenumber,avatarurl} =  form;
        const URL = 'http://localhost:5000/auth';

        const {data:{token,userId,hashedPassword}} =await axios.post(`${URL}/${isSignup ? 'signup':'login'}`,{username,password,fullname,phonenumber,avatarurl})

        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullname',fullname);
        cookies.set('userId',userId);

        if(isSignup){
            cookies.set('phonenumber',phonenumber);
            cookies.set('avatarurl',avatarurl);
            cookies.set('hashedPassword',hashedPassword);
           }
           window.location.reload();   
      }    

  

const switchMode = () =>{
    setIsSignup((prevIsSignup) => !prevIsSignup);
    };


  return (
      <div className = "auth__form-container">
            <div className="auth__form-container_fields">
                <div className = "auth__form-container_fields-content">
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p> 
                <form onSubmit ={ handleSubmit }>

                    {isSignup && (
                        <div className = "auth__form-container_fields-content_input">
                            <label htmlFor="fullname">Full Name</label>
                            <input 
                            name="fullname" 
                            type="text" 
                            placeholder="Full name"
                             onChange={handleChange}
                            required />
                        
                        </div>
                    )}

                    <div className = "auth__form-container_fields-content_input">
                        <label htmlFor="username">User Name</label>
                        <input 
                        name="username" 
                        type="text" 
                        placeholder="kindly enter  your Username"
                        onChange={handleChange} 
                        required />

                    </div>


                    {isSignup && (
                        <div className = "auth__form-container_fields-content_input">
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input 
                            name="phonenumber" 
                            type="text" 
                            placeholder="phone Number"
                            onChange={handleChange} 
                            required />
                        
                        </div>
                    )}


                    
                    {isSignup && (
                        <div className = "auth__form-container_fields-content_input">
                            <label htmlFor="avatarurl">Avatar URL</label>
                            <input 
                            name="avatarurl" 
                            type="text" 
                            placeholder="avatar URL"
                            onChange={handleChange} 
                            required />
                        
                        </div>
                    )}

                    <div className = "auth__form-container_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input 
                        name="password" 
                        type="password" 
                        placeholder="kindly enter your prefered password "
                        onChange={handleChange} 
                        required />

                    </div>

                    {isSignup && (
                        <div className = "auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                            name="confirmpassword" 
                            type="password" 
                            placeholder="Confirm your  password "
                            onChange={handleChange} 
                            required />

                        </div>

                    )}

                <div className ="auth__form-container_fields-content_button">
                    <button>
                    {isSignup ? "Sign Up":"Sign In"}
                    </button>
               </div>
                    
                </form>
                <div className="auth__form-container_fields-account">
                    <p>{isSignup ? "Already have an account?":"dont have an account?"}</p>
                    <span onClick={switchMode}>
                    {isSignup ? 'Sign In' : 'Sign Up'}
                    </span>
                </div>
                </div> 
            </div>

            <div className="auth__container_image">
                 <img src={signinImage} alt="sign in" width="760px"/>
             </div>


      </div>
  )


}

export default Auth


