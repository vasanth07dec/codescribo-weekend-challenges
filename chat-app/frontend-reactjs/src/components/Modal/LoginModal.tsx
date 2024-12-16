import { users } from "../../data/users";
import styles from "./LoginModal.module.css";
import otherStyle from "../ChatLists/ChatList.module.css";
import { useEffect, useState } from "react";
import { User } from "../../types/user";

type Props = {
  setLoginUserId: (value: number) => void;
};

/**
 * Component - LoginModal
 * Used for list of user for login(simply tap on user to login)
 *
 * @returns {JSX.Element} the LoginModal component
 */
const LoginModal = ({ setLoginUserId }: Props) => {
  const [manageLogin, setManageLogin] = useState<User[]>(() => {
    // Initialize state from localStorage or use default users
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : users;
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(manageLogin));
  }, [manageLogin]);

  // Listen for storage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Based on users key to track changes
      if (event.key === "users") {
        const updatedUsers = event.newValue ? JSON.parse(event.newValue) : [];
        setManageLogin(updatedUsers);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.modalBackdrop}>
      <main className={styles.modalContent}>
        <div className={styles.modalHeader}>Login as a User</div>
        {/* Showing user list */}
        <section className={otherStyle["chat-list-container"]}>
          {manageLogin
            ?.filter((u) => !u.isLogin)
            ?.map((u) => (
              <div
                key={u.id}
                className={otherStyle.chat}
                onClick={() => {
                  const updatedUsers = manageLogin.map((user) =>
                    user.id === u.id ? { ...user, isLogin: true } : user
                  );
                  setManageLogin(updatedUsers);
                  localStorage.setItem("users", JSON.stringify(updatedUsers));
                  setLoginUserId(u.id);
                }}
              >
                <img src={u.picture} alt="profile" />
                <div>
                  <p className={otherStyle["user-name"]}>{u.name}</p>
                  <p className={otherStyle["user-info"]}>Tap to login!</p>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default LoginModal;
