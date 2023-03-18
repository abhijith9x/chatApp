import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AllChats from "../components/allChats/AllChats";
import ChatDetails from "../components/chatDetail/ChatDetails";
import LoadingUi from '../components/loadingScreen/LoadingUi'
import { UserContext } from "../context/UserDetailsProvider";
import noConversation from "../assets/images/noConversation.png";
import { socket } from "../context/SocketContext";
import Profile from "../components/profile/Profile";

export default function ChatInterface() {
  const [currentChat, setCurrentChat] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [profile, setProfile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  //Socket io new users
  useEffect(() => {
    socket.emit("new-user-add", user?._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Recieve message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (progress >= 100) setLoading(false);
      else {
        const increment = Math.floor(Math.random() * (10 + 1)) + 7;
        setProgress(progress + increment);
      }
    }, 300);

    return () => clearTimeout(id);
  }, [progress]);

  return (
    <>
      {loading ? (
        <LoadingUi progress={progress} />
      ) : (
        <div className="w-screen h-screen overflow-hidden bg-[#E1E1DE] dark:bg-[#111a21] ">
          <div className="flex justify-start whatsapp-bp:justify-center items-center h-full ">
            <div className="bg-[#00A884] dark:hidden h-28 w-full absolute top-0">
            </div>
            <div className="dark:bg-[#111a21] bg-[#FFFFFF] min-w-[340px] max-w-[500px] relative w-100 h-100  ">
              {/* //all chats */}
              {profile ? (
                <Profile setProfile={setProfile} />
              ) : (
                <AllChats
                  setCurrentChat={setCurrentChat}
                  setProfile={setProfile}
                  onlineUsers={onlineUsers}
                />
              )}
            </div>
            <div className="dark:bg-[#222f35] bg-[#F0F2F5] min-w-[415px] max-w-[1120px] w-full h-full relative ">
              {/* //chat details */}
              {currentChat !== null ? (
                <ChatDetails
                  chat={currentChat}
                  currentUser={user._id}
                  recieveMessage={recieveMessage}
                  onlineUsers={onlineUsers}
                />
              ) : (
                <>
                  <div className="w-full h-full flex justify-center items-center">
                    <div>
                      <h2 className="dark:text-white text-center mb-4 font-medium">
                        WhatsApp Web
                      </h2>
                      <img src={noConversation}></img>
                      <p className="dark:text-white text-center">
                        Tap on chat to start conversation
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
