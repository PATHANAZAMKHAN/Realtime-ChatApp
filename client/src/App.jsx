import { ChatLogin } from "./components/ChatLogin";
import { Routes, Route } from "react-router-dom";
import { ChatRoom } from "./components/ChatRoom";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    chatroom: "chatroom",
  },
});

function App() {
  return (
    <>
      <Routes>
        <Route element={<ChatLogin socket={socket} />} path="/" />
        <Route element={<ChatRoom socket={socket} />} path="/chatroom" />
      </Routes>
    </>
  );
}

export default App;
