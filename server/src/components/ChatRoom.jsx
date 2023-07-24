import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { buttonClicks, initialValues } from "../utils/Reducer";
import { onBtnClicked } from "../utils/Features";
import EmojiPicker from "emoji-picker-react";

export const ChatRoom = ({ socket }) => {
  const inputText = React.useRef(null);
  const getLoggedInStatus = sessionStorage.getItem("currUser");
  const navigate = useNavigate();
  const { user, room } = JSON.parse(getLoggedInStatus) || "";
  const [messages, setMessages] = React.useState([]);
  const [currStyle, setCurrStyle] = React.useState();
  const [buttonStyle, setButtonStyle] = React.useState({
    boldButtonStyle: "",
    italicsButtonStyle: "",
    strikeThroughButtonStyle: "",
    hyperLinkButtonStyle: "",
    blockQuoteStyle: "",
    numberedListButtonStyle: "",
    bulletListButtonStyle: "",
    codeSnippetButtonStyle: "",
    codeBlockButtonStyle: "",
    fileUploadButtonStyle: "",
    emojiButtonStyle: "",
    mentionSomeoneButtonStyle: "",
  });
  const [connectedusers, setConnectedUsers] = React.useState([]);
  const [state, dispatch] = React.useReducer(buttonClicks, initialValues);

  React.useEffect(() => {
    if (getLoggedInStatus === null) {
      navigate("/");
    }
  }, [getLoggedInStatus, navigate]);

  React.useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessages((prev) => {
        return [...prev, data];
      });
    };

    const connectedUsersHandler = (data) => {
      setConnectedUsers(data);
    };

    // Add the event listener
    socket.on("receive-message", receiveMessageHandler);
    socket.on("connected_users", connectedUsersHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [socket]);

  const setClickedEmoji = (emojiObject) => {
    inputText.current.value += emojiObject.emoji;
  };

  const handleInput = (e) => {
    e.preventDefault();

    const text = inputText?.current?.value;

    if (text === "" || text === undefined || text === null) {
      return;
    } else {
      inputText.current.value = "";

      const messageData = {
        message: text,
        messageRoom: room,
        messageUser: user,
        userId: socket.id,
      };
      setMessages((prev) => {
        return [...prev, messageData];
      });
      socket.emit("send-message", messageData);
    }
  };

  return (
    <>
      <div className="relative h-screen flex flex-col justify-center items-center bg-black">
        {state.emojiButton === true && (
          <div className="absolute left-0 bottom-16">
            <EmojiPicker
              onEmojiClick={setClickedEmoji}
              height={"400px"}
              width={"250px"}
            />
          </div>
        )}
        {state.mentionSomeoneButton === true && (
          <div className="absolute left-[22rem] bottom-10 bg-white overflow-auto rounded p-2">
            {connectedusers?.map((user) => {
              return (
                <>
                  <p>@{user}</p>
                </>
              );
            })}
          </div>
        )}
        <div
          key={uuidv4()}
          className="h-[60%] w-[90%] border-2 border-white rounded overflow-auto "
        >
          {/* CHAT SECTION */}
          {messages.map((data) => {
            return (
              <>
                <div
                  key={uuidv4()}
                  className="bg-white p-2 rounded shadow w-fit h-fit m-2 "
                >
                  <div key={uuidv4()}>
                    <span key={uuidv4()} className="text-gray-500">
                      {data.messageUser}:{" "}
                    </span>
                    <span key={uuidv4()}>{data.message}</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <form
          onSubmit={handleInput}
          className="h-[30%] w-[90%] flex flex-col border-2 border-white rounded"
        >
          {/* INPUT SECTION */}
          <div className="h-[25%] flex justify-evenly items-center text-white border border-white">
            {/* UPPER FEATURE SECTION */}
            <button
              type="button"
              name="bold"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ${buttonStyle.boldButtonStyle}`}
            >
              <img src="/bold-white.svg" className="imageClass" alt="Bold" />
            </button>
            <button
              type="button"
              name="italics"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ${buttonStyle.italicsButtonStyle}`}
            >
              <img
                src="/italic-white.svg"
                className="imageClass"
                alt="Italics"
              />
            </button>
            <button
              type="button"
              name="strikeThrough"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ${buttonStyle.strikeThroughButtonStyle}`}
            >
              <img
                src="/strikethrough.svg"
                className="imageClass"
                alt="Strikethrough"
              />
            </button>
            <button
              disabled={true}
              type="button"
              name="addLink"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ${buttonStyle.hyperLinkButtonStyle}`}
            >
              <img src="/link.svg" className="imageClass" alt="Link" />
            </button>

            <button
              type="button"
              name="addQuotes"
              onClick={(e) =>
                onBtnClicked(
                  state,
                  dispatch,
                  setCurrStyle,
                  setButtonStyle,
                  e,
                  inputText
                )
              }
              className={`svgStyle ${buttonStyle.blockQuoteStyle}`}
            >
              <img src="/quote.svg" className="imageClass" alt="Italicwhite" />
            </button>

            <button
              type="button"
              name="addNumbers"
              onClick={(e) =>
                onBtnClicked(
                  state,
                  dispatch,
                  setCurrStyle,
                  setButtonStyle,
                  e,
                  inputText
                )
              }
              className={`svgStyle ${buttonStyle.numberedListButtonStyle}`}
            >
              <img
                className="imageClass"
                src="/number-list.svg"
                alt="Numberlist"
              />
            </button>
            <button
              type="button"
              name="addBullets"
              onClick={(e) =>
                onBtnClicked(
                  state,
                  dispatch,
                  setCurrStyle,
                  setButtonStyle,
                  e,
                  inputText
                )
              }
              className={`svgStyle ${buttonStyle.bulletListButtonStyle}`}
            >
              <img
                src="/bullet-list.svg"
                className="imageClass"
                alt="Bulletlist"
              />
            </button>
          </div>
          {/* TYPING SECTION */}
          <textarea
            className={`bg-black border-2 border-white text-center text-white text-xl resize-none ${currStyle}`}
            placeholder="Please Enter your desired message here.........."
            name="message"
            id="message"
            cols="30"
            rows="20"
            ref={inputText}
            // onKeyDown={(e) => e.key === "Enter" && handleInput(e)}
          ></textarea>
          <div className="h-[20%] flex items-center text-white border border-white">
            {/* LOWER FEATURE SECTION */}
            <button
              disabled={true}
              type="button"
              name="uploadFile"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ml-16 ${buttonStyle.fileUploadButtonStyle}`}
              title="Add File"
            >
              <img src="/plus.svg" className="imageClass" alt="" />
            </button>
            <button
              type="button"
              name="addEmoji"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
              className={`svgStyle ${buttonStyle.emojiButtonStyle} ml-16`}
              title="Emoji"
            >
              <img src="/emoji.svg" className="imageClass" alt="Emoji" />
            </button>
            <button
              disabled={true}
              type="button"
              className={`svgStyle ${buttonStyle.mentionSomeoneButtonStyle} ml-16 mr-auto`}
              title="@mentions"
              name="addMention"
              onClick={(e) =>
                onBtnClicked(state, dispatch, setCurrStyle, setButtonStyle, e)
              }
            >
              <img src="/symbol-at.svg" className="imageClass" alt="" />
            </button>
            <button
              type="submit"
              className="mr-5 hover:bg-blue-600 p-2 rounded"
              title="Send"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 m-1 md:m-0"
                strokeWidth="2"
              >
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

ChatRoom.propTypes = {
  socket: PropTypes.object.isRequired,
};
