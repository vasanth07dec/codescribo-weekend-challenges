import { IoIosCall } from "react-icons/io";
import style from "./Inbox.module.css";
import { MdVideocam } from "react-icons/md";
import { FaArrowRight, FaFolder } from "react-icons/fa6";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { User } from "../../types/user";

type Props = {
  selectedUser: User;
};
const Inbox = ({ selectedUser }: Props) => {
  return (
    <header className={style.container}>
      <div className={style["chat-container"]}>
        <div className={style["header-container"]}>
          <div className={style.profile}>
            <img src={selectedUser?.picture} alt="profile" />
            <div className={style.info}>
              <p>{selectedUser?.name}</p>
              <p className={style.small}>online</p>
            </div>
          </div>
          <div className={style["icons-container"]}>
            <MdVideocam color="#676dda" size={35} />
            <IoIosCall color="#676dda" size={28} />
            <FaFolder color="#676dda" size={25} />
          </div>
        </div>
        <div className={style["chat-body"]}>
          <p>hi</p>
        </div>
        <div className={style["chat-footer"]}>
          <input type="text" placeholder="Enter your message" />
          <div className={style["icons-container"]}>
            <BsEmojiGrin color="#676dda" size={25} />
            <GoPlus color="#676dda" size={28} />
            <button>
              <FaArrowRight color="white" size={25} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Inbox;
