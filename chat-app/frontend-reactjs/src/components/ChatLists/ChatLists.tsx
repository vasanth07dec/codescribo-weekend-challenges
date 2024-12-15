import { users } from "../../data/users";
import { User } from "../../types/user";
import style from "./ChatList.module.css";

type Props = {
  setSelectedUser: (value: User) => void;
  loginUserId: number | undefined;
};
const ChatLists = ({ setSelectedUser, loginUserId }: Props) => {
  return (
    <div className={style["chat-list-container"]}>
      {users
        ?.filter((u) => u.id !== loginUserId)
        ?.map((u) => (
          <div
            key={u.id}
            className={style.chat}
            onClick={() => setSelectedUser(u)}
          >
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
