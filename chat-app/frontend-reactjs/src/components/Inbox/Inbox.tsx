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
  msg: string;
  setMsg: (v: string) => void;
  messageList: { senderId: number; message: string; time: string }[];
  loginUserId: number | undefined;
};

/**
 * Component - Inbox
 * Showing transfered messages between users.
 *
 * @returns {JSX.Element} the Inbox component
 */
const Inbox = ({
  selectedUser,
  handleSendMsg,
  msg,
  setMsg,
  messageList,
  loginUserId,
}: Props) => {
  return (
    <header className={style.container}>
      <main className={style["chat-container"]}>
        {/* Chat header */}
        <section className={style["header-container"]}>
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
        </section>
        {/* Chat body */}
        <section className={style["chat-body"]}>
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
        </section>
        {/* Footer */}
        <section className={style["chat-footer"]}>
          <input
            type="text"
            value={msg}
            placeholder="Enter your message"
            onChange={(e) => setMsg(e.target.value)}
          />
          <div className={style["icons-container"]}>
            <BsEmojiGrin color="#676dda" size={25} />
            <GoPlus color="#676dda" size={28} />
            <button
              onClick={() => {
                setMsg("");
                handleSendMsg();
              }}
            >
              <FaArrowRight color="white" size={25} />
            </button>
          </div>
        </section>
      </main>
    </header>
  );
};

export default Inbox;
