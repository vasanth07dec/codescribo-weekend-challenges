import style from "./Sidebar.module.css";
import { FaPowerOff } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { TbSettingsFilled } from "react-icons/tb";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Sidebar = () => {
  return (
    <nav className={style["sidebar-container"]}>
      <div className={style["icons-container"]}>
        <FaPowerOff color="white" size={35} />
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
