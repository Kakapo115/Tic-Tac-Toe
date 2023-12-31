import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";
import Axios from "axios";

function App() {
  Axios.defaults.baseURL = "https://tictactoe-z3r6.onrender.com";
  Axios.defaults.withCredentials = true;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("username");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      <h1 className="whoYouAre">Username: {cookies.get("username")}</h1>
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}> Log Out </button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
