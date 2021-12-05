import React from 'react';
import './Chatforum.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from "./Chat";


const socket = io("http://localhost:3001")

function Chatforum(){

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

  
    const joinRoom = () => {
      if (username !== "" && room !== "") {
       socket.emit("join_room", room);
        setShowChat(true);
      }
    };

    return (

    <section>

    <div className="forumHeader">
    <img src='./images/meetamate.png' width="900" alt="Forum Header"/>
    </div>
        
        <div className="chatForum">
        {!showChat ? (
        <div className="joinChatContainer">
          <p className="joinChatContainer2background">Connect with a fellow recipe mate!
          You must be resigtered in order to enter a chat room.<br/>
          <br/>The Room ID that you enter should match the ID of the recipe mate you wish to communicate with.</p>
        
        <h3>PLEASE ENTER DETAILS</h3>
          <input
            type="text"
            placeholder="Sarah..."
            onChange={(event) => {
            setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button className="joinroom" onClick={joinRoom}>JOIN ROOM</button>
        </div>
      ) : (
    <Chat socket={socket} username={username} room={room} />
    )}

    </div>
    </section>
    );
    
}

export default Chatforum;