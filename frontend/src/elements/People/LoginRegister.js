import React, { Fragment, useRef, useState, useEffect } from 'react'
import MailOutline from "@mui/icons-material/MailOutline";
import LockOpen from "@mui/icons-material/LockOpen";
import {Link} from "react-router-dom";
import "./LoginRegister.css";  
import Face from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import {  login, register, clearErrors} from "../../allActions/peopleAction";
import { useNavigate } from 'react-router-dom';
import Wait from "../layout/Waiting/Wait.js";
import {useSearchParams} from "react-router-dom";


const LoginRegister = () => {   
  const navigate= useNavigate();
  const [searchParams]=useSearchParams(); 
  const dispatch = useDispatch();
 
  const loginTab=useRef(null);
  const switcherTab=useRef(null);
  const registerTab = useRef(null); 

  const {  isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] =useState("");
  const [loginPasssword, setLoginPassword] =useState("");

  const [user,setUser] = useState({
    name: "",
    email: "",
    password: "",
  }); 

  const {name, email, password } = user;
  
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


  const loginSubmit =(e) => {
    e.preventDefault();
   dispatch(login(loginEmail, loginPasssword));

  };
 
  const registerSubmit = (e) => 
  {
    e.preventDefault();

    const myForm = new FormData();
 
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    
    }  

    const registerDataChange =(e) => 
    {
      if(e.target.name === "avatar")  
      {
        const reader = new FileReader();

        reader.onload = () => {
          if(reader.readyState === 2){
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        }; 
 
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({...user, [e.target.name]: e.target.value });
      }
    };
    const redirect = [...searchParams][0] ? `/${[...searchParams][0][1]}` : '/account';
 

    useEffect(() => {
       
      if (isAuthenticated) {
        navigate(redirect);
      }
    
    }, [dispatch, isAuthenticated]);

  const switchTabs =(e,tab) => {
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  } 
 
  return ( 
    <Fragment>
   {loading ? ( <Wait/> ) :
    ( 
  <Fragment> 
   <div className="LoginRegisterContainer">
    <div className="LoginRegisterBox">
      <div> 
        <div className="loginRegisterToggle">
          <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
          <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
        </div>
        <button ref={switcherTab}></button>
      </div>

      <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
        <div className="loginEmail">
          <MailOutline/>
          <input type="email" 
          placeholder='Email'
          required
          value={loginEmail}  
          onChange={(e) => setLoginEmail(e.target.value)}/> 
        </div>

        <div className="loginPassword">
          <LockOpen/>
          <input type="password" 
          placeholder='Password'
          required
          value={loginPasssword} 
          onChange={(e) => setLoginPassword(e.target.value)}/>
        </div>

      <Link to="/password/forgot">Forget Password ?</Link>
      <input type="submit" value="login" className="loginBtn" />
      </form>

      <form 
      className= "registerForm"
      ref={registerTab}
      encType="multipart/form-data"
      onSubmit={registerSubmit}
      >
        <div className="registerName">
          <Face />
          <input type="text"
          placeholder="Name" 
          required
          name="name"
          value={name}
          onChange={registerDataChange}
          />
        </div>

        <div className="registerEmail">
          <MailOutline />
          <input type="email"
          placeholder="Email" 
          required
          name="email"
          value={email}
          onChange={registerDataChange}
          />
        </div>

        <div className="registerPassword">
          <LockOpen />
            <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password} 
                    onChange={registerDataChange}
             />
          </div>

        <div id="registerImage">
        <img src={avatarPreview} alt="Avatar" />
        <input 
        type="file"
        name="avatar"
        accept="image/*"
        onChange={registerDataChange}
        />
        </div>

        <input type="submit" value="register" className="registerBtn"/>
      </form>
    </div>
   </div>
      

   </Fragment>
    )
    
  } 
  </Fragment>
  )
}

export default LoginRegister;