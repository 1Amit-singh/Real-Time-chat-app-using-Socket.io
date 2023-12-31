import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute, setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from "buffer"


const SetAvatar = () => {

  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [ avatars, setAvatars ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ selectedAvatars, setSelectedAvatars ] = useState(undefined);

  useEffect(()=> {
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const setProfilePicture = async() => {
    if(selectedAvatars === undefined){
      toast.error("Please select an avatar", toastOptions);
    }
    else{
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatars],
      });
      // console.log(setAvatarRoute, selectedAvatars, user, data);
      if (data.isSet){
        user.isAvatarImage = true;
        user.avatarImage = data.Image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      }
      else{
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }

  };
  useEffect(()=> {
    async function fetchData(){
      const data = [];
      for(let i=0; i<4; i++){
        const image = await axios.get(`${api}/${Math.round( Math.random() * 1000) }`)
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      };
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();

  }, []);

  return (
    <>
    {
      isLoading ? <Container>
        <img src={loader} alt="loader" className="loader" />
      </Container> : (
        <Container>
        <div className="title-container">
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {
            avatars.map((avatar, index) => {
              return(
                <div key={index} className={`avatar ${
                  selectedAvatars === index ? "selected" : "" 
                }`} >
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatars(index)} />
                </div>
              )
            })
          }
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
      </Container>
      )
    }
      <ToastContainer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader{
    max-inline-size: 100%;
  }
  .title-container{
    h1{
      color: #fff;
    }

  }
  .avatars{
    display: flex;
    gap: 2rem;
    
    .avatar{
      border: 0.4rem solid transparent;
      padding: .4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .5s ease-in-out;
      img{
        height: 6rem;
      }
    }
    .selected{
      border: .4rem solid #4e0eff
    }
  }
  .submit-btn{
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

`;

// 1:26:30 -- Time Stamp Continue . . . 
export default SetAvatar