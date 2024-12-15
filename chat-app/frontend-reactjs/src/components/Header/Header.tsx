import { users } from "../../data/users";
import style from "./Header.module.css";

type Props = {
  loginUserId: number | undefined;
};
const Header = ({ loginUserId }: Props) => {
  const [currentUser] = users.filter((u) => u.id === loginUserId);
  return (
    <nav className={style.nav}>
      <input
        type="text"
        placeholder="Search contacts, messages or options here"
      />
      {currentUser && (
        <div className={style["profile-container"]}>
          <div className={style.profile}>
            <div>
              <p>{currentUser?.name}</p>
              <p className={style.small}>online</p>
            </div>
            <img src={currentUser?.picture} alt="profile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
