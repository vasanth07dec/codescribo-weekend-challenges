import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatLists from "../../components/ChatLists/ChatLists";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./Messenger.module.css";
import Inbox from "../../components/Inbox/Inbox";
import { User } from "../../types/user";

const socket = io("http://localhost:3000/");

const Messenger = () => {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("room");
  const [selectedUser, setSelectedUser] = useState<User>();

  console.log(selectedUser, "selectedUser");
  const sendMsg = async () => {
    if (msg !== "") {
      console.log("message sent");
      const data = {
        room: room,
        username: "sender",
        message: msg,
        time: new Date().getHours + " : " + new Date().getMinutes,
      };
      await socket.emit("send_message", data);
    }
  };

  useEffect(() => {
    socket.emit("register_user", selectedUser?.id);
    socket.emit("joinRoom", "room");
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style["chat-container"]}>
        <Header />
        <div className={style["chat-lists-container"]}>
          <ChatLists setSelectedUser={setSelectedUser} />
          {selectedUser ? <Inbox selectedUser={selectedUser} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
