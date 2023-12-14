import React, { useState, useCallback, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/chat-logo.png";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(()=> {
    if(localStorage.getItem('chat-app-user')){
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()){
      const {password, username} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate("/")
      }
    };
  };

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  const handleValidation = () => {
    const {password, username} = values;
    if(password === ""){
      toast.error("Username and Password is required", toastOptions);
      return false;
    }
    else if (username === ""){
      toast.error("Username and Password is required", toastOptions);
      return false;
    }
    else if (password.length < 8){
      toast.error("Password should be greater than 8 characters", toastOptions);
      return false;
    }
    return true;

  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" srcset="" />
            <h1>LLL</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>Don't have an Account ? <Link to="/register" >Register</Link> </span>

        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  justify-content: center;

  .brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img{
      height: 5rem;
      mix-blend-mode: exclusion;
    }
    h1{
      color: #fff;
      text-transform: uppercase;
    }
  }

  form{
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #00000076;
      border-radius: 2rem;
      padding: 3rem 5rem;
    }
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;
      &:focus{
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button{
      background-color: #997af0;
      padding: 1rem 2rem;
      color: #fff;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color: #4e0eff;
      }
    }
    span{
      color: #fff;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }


`;

export default Login;
