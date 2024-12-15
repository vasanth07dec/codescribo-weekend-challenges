import { User } from "../../types/user";
import style from "./ChatList.module.css";

type Props = {
  setSelectedUser: (value: User) => void;
};
const ChatLists = ({ setSelectedUser }: Props) => {
  const users = [
    {
      id: 1,
      name: "Jonas Mars",
      picture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Larry croft",
      picture:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className={style["chat-list-container"]}>
      {users.map((u) => (
        <div className={style.chat} onClick={() => setSelectedUser(u)}>
          <img src={u.picture} alt="profile" />
          <div>
            <p className={style["user-name"]}>{u.name}</p>
            <p className={style["user-info"]}>tap and chat</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLists;
