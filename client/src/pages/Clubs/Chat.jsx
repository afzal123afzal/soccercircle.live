import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
// import LogoSearch from '../../components/Clubs/LogoSearch'
import { useSelector } from 'react-redux'
import { axiosClubsInstance } from '../../instance/Axios'
import Conversation from '../../components/Clubs/Conversation'
import ChatBox from '../../components/Clubs/ChatBox'
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import ClubNavbar from '../../components/Clubs/ClubNavbar'

const Chat = () => {
  const user = useSelector((state) => state.club.clubDetails)
  // console.log(user._id);
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);



  const socket = useRef()
  const location = useLocation()
  // console.log(location.state, "Location");
  const locationItem = location.state


  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      // console.log(onlineUsers);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      // console.log(data)
      setReceiveMessage(data);
    }

    );
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axiosClubsInstance.get(`/chat/${user._id}`,
          { headers: { 'Authorization': `Bearer ${user.token}` } }
        )
        setChats(data)
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getChats()
  }, [user, locationItem])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <>
      <div class="chat-wrapper">
        <ClubNavbar />
        <div className="Chat">
          {/* Left Side */}
          <div className="Left-side-chat">
            {/* <LogoSearch /> */}
            <div className="Chat-container">
              <h2>Chats</h2>
              <div className="Chat-list">
                {chats.map((chat) => {
                  return (
                    <div onClick={() => setCurrentChat(chat)} >
                      <Conversation data={chat} clubAuth={user} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
          {/* Right Side */}
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
            {/* Chat Body */}
            <ChatBox chat={currentChat} clubAuth={user} currentUser={user._id} setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
            />
          </div>
        </div>
      </div>
    </>
  )


}


export default Chat