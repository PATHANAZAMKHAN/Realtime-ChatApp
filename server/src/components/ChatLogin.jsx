/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ChatLogin = ({ socket }) => {
  const userRef = React.useRef(null);
  const roomRef = React.useRef(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();

    const userObj = {
      user: userRef?.current?.value,
      room: roomRef?.current?.value,
    };

    socket.emit("join-room", userObj.room);

    sessionStorage.setItem("currUser", JSON.stringify(userObj));
    navigate("/chatroom");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-evenly items-center bg-black">
        <h1 className="text-4xl font-bold text-white">
          WELCOME TO MY CHAT APP
        </h1>
        <form
          onSubmit={handleInput}
          className="h-[60%] w-[25%] flex flex-col items-center justify-evenly border-2 border-white rounded"
        >
          <h1 className="text-4xl font-bold text-white">JOIN THE ROOM</h1>
          <label className="text-2xl font-bold text-white">
            Enter Your Name
          </label>
          <input
            type="text"
            className="text-xl font-bold text-center p-2 rounded w-[90%]"
            placeholder="Please enter your name"
            name="username"
            id="username"
            ref={userRef}
          />
          <label className="text-2xl font-bold text-white">Room Code</label>
          <input
            type="text"
            className="text-xl font-bold text-center p-2 rounded w-[90%]"
            placeholder="Please enter your Room Code"
            name="room"
            id="room"
            ref={roomRef}
          />
          <button
            type="submit"
            className="text-2xl font-bold text-white bg-green-600 rounded p-2"
          >
            Create Room
          </button>
        </form>
      </div>
    </>
  );
};

ChatLogin.propTypes = {
  socket: PropTypes.object.isRequired,
};
