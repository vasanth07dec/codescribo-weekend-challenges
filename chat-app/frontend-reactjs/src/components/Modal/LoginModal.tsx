import { users } from "../../data/users";
import styles from "./LoginModal.module.css";
import otherStyle from "../ChatLists/ChatList.module.css";

type Props = {
  setLoginUserId: (value: number) => void;
};
const LoginModal = ({ setLoginUserId }: Props) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>Login as a User</div>
        <div className={otherStyle["chat-list-container"]}>
          {users.map((u) => (
            <div
              key={u.id}
              className={otherStyle.chat}
              onClick={() => setLoginUserId(u.id)}
            >
              <img src={u.picture} alt="profile" />
              <div>
                <p className={otherStyle["user-name"]}>{u.name}</p>
                <p className={otherStyle["user-info"]}>Tap to login!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
