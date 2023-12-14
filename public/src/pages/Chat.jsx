import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/APIRoutes';
import axios from "axios";
import Contacts from '../components/Contacts';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(()=> {
    async function fetchData() {
      if(!localStorage.getItem('chat-app-user')){
        navigate("/login");
      }
      else{
        const temp = await  JSON.parse(localStorage.getItem("chat-app-user"))
        setCurrentUser(temp);
      }
    }
    fetchData();
  }, [])
  useEffect(()=> {
    async function fetchData (){
      if(currentUser){
        if(currentUser.isAvatarImage){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          console.log(data.data);
        }
        else{
          navigate("/setavatar")
        }
      }
    }
    fetchData();
  }, [currentUser])
  // console.log(contacts, currentUser);
  
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  )
}


const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`
export default Chat