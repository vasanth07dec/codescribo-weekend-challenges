import style from "./Sidebar.module.css";
import { FaPowerOff } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { TbSettingsFilled } from "react-icons/tb";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

/**
 * Component - Sidebar
 * Showing logout and other navigation icons
 *
 * @returns {JSX.Element} the Sidebar component
 */
const Sidebar = ({
  setLoginUserId,
}: {
  setLoginUserId: (v: number | undefined) => void;
}) => {
  return (
    <nav className={style["sidebar-container"]}>
      <div className={style["icons-container"]}>
        <div
          className={style["login-container"]}
          onClick={() => {
            localStorage.clear()
            setLoginUserId(undefined);
          }}
        >
          <FaPowerOff color="white" size={35} />
          <span>Logout</span>
        </div>
        <IoChatboxOutline color="white" size={35} />
        <FaUser color="white" size={35} />
        <LuLayoutGrid color="white" size={35} />
      </div>
      <div className={style["icons-container"]}>
        <TbSettingsFilled color="white" size={35} />
        <HiOutlineMenuAlt2 color="white" size={35} />
      </div>
    </nav>
  );
};

export default Sidebar;
