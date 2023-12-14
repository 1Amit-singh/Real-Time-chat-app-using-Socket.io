import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/chat-logo.png";

const Contacts = ({ contacts, currentUser }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {

    }
    console.log(currentUserImage, currentUserName);
  return (
    <>
       {
            currentUserImage && currentUserName && true (
                
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="LOGO" srcset="" />
                        <h3>LLL</h3>
                    </div>
                    <div className="contacts">
                        {
                            contacts.map((contact, index) => {
                                <div className={`contact ${index === currentSelected ? "selected": ""}`} key={index}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                        </div>
                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )
        }
    </>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
`


export default Contacts