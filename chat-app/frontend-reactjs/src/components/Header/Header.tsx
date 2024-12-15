import style from "./Header.module.css";

const Header = () => {
  return (
    <nav className={style.nav}>
      <input type="text" placeholder="Search contacts, messages or options here" />
      <div className={style["profile-container"]}>
        <div className={style.profile}>
          <div>
            <p>John Mattews</p>
            <p className={style.small}>online</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
