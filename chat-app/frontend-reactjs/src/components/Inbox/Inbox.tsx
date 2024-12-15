import { IoIosCall } from "react-icons/io";
import style from "./Inbox.module.css";
import { MdVideocam } from "react-icons/md";
import { FaArrowRight, FaFolder } from "react-icons/fa6";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { User } from "../../types/user";

type Props = {
  selectedUser: User;
  handleSendMsg: () => void;
  setMsg: (v: string) => void;
  messageList: { senderId: number; message: string; time: string }[];
  loginUserId: number | undefined;
};
const Inbox = ({
  selectedUser,
  handleSendMsg,
  setMsg,
  messageList,
  loginUserId,
}: Props) => {
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
          {messageList?.map((message, index) => (
            <div
              className={`${
                message.senderId === loginUserId
                  ? style["you"]
                  : style["receiver"]
              }`}
            >
              <p
                key={index + 1}
                className={`${
                  message.senderId === loginUserId
                    ? style["sender-msg"]
                    : style["receiver-msg"]
                }`}
              >
                {message.message}
              </p>
              <span className={style.time}>{message.time}</span>
            </div>
          ))}
        </div>

        <div className={style["chat-footer"]}>
          <input
            type="text"
            placeholder="Enter your message"
            onChange={(e) => setMsg(e.target.value)}
          />
          <div className={style["icons-container"]}>
            <BsEmojiGrin color="#676dda" size={25} />
            <GoPlus color="#676dda" size={28} />
            <button onClick={() => handleSendMsg()}>
              <FaArrowRight color="white" size={25} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Inbox;
