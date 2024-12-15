import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatLists from "../../components/ChatLists/ChatLists";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./Messenger.module.css";
import Inbox from "../../components/Inbox/Inbox";
import { User } from "../../types/user";
import LoginModal from "../../components/Modal/LoginModal";
import { getCurrentTime } from "../../utils/getCurrentTime";

const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

const Messenger = () => {
  const [msg, setMsg] = useState("");
  const [loginUserId, setLoginUserId] = useState<number>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [messageList, setMessageList] = useState<
    { senderId: number; message: string; time: string }[]
  >([]);

  const handleSendMsg = async () => {
    if (msg !== "") {
      console.log("message sent");
      const data = {
        senderId: loginUserId,
        receiverId: selectedUser?.id,
        message: msg,
        time: getCurrentTime()
      };
      setMessageList((prev) => [
        ...prev,
        { senderId: loginUserId!, message: msg, time: data.time },
      ]);
      await socket.emit("send_message", data);
    }
  };

  useEffect(() => {
    socket.emit("register_user", loginUserId);
  }, [loginUserId]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "success");
      setMessageList((prev) => [
        ...prev,
        { senderId: data.senderId, message: data.message, time: data.time },
      ]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div className={style.container}>
      {!loginUserId && <LoginModal setLoginUserId={setLoginUserId} />}
      <Sidebar />
      <div className={style["chat-container"]}>
        <Header loginUserId={loginUserId} />
        <div className={style["chat-lists-container"]}>
          <ChatLists
            setSelectedUser={setSelectedUser}
            loginUserId={loginUserId}
          />
          {selectedUser ? (
            <Inbox
              selectedUser={selectedUser}
              handleSendMsg={handleSendMsg}
              setMsg={setMsg}
              messageList={messageList}
              loginUserId={loginUserId}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
