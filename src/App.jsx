import { useContext, useState, useEffect } from "react";
import "./app.css";
import logo from "./assets/chatbot.png";
import add from "./assets/add-30.png";
import home from "./assets/home.svg";
import rocket from "./assets/rocket.svg";
import bookmark from "./assets/bookmark.svg";
import message from "./assets/message.svg";
import send from "./assets/send.svg";
import avatar from "./assets/user-icon.png";
import { Context } from "./context/Context";
function App() {
  const [count, setCount] = useState(0);
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    previousPrompts,
    setRecentPrompt,
    newChat,
  } = useContext(Context);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  const handlePrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="top">
            <div className="imgContainer">
              <img src={logo} alt="" className="logo" />
              <span>QueryBot</span>
            </div>
            <button onClick={() => newChat()}>
              <img src={add} alt="" />
              <span>New Chat</span>
            </button>
            <div className="queries">
              {previousPrompts?.map((item, index) => (
                <button onClick={() => handlePrompt(item)} key={index}>
                  <img src={message} alt="" />
                  <span>{item.slice(0, 18)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bottom">
            <div className="items">
              <img src={home} alt="" />
              <span>Home</span>
            </div>
            <div className="items">
              <img src={bookmark} alt="" />
              <span>Save</span>
            </div>
            <div className="items">
              <img src={rocket} alt="" />
              <span>Upgrade to pro</span>
            </div>
          </div>
        </div>
        <div className="right">
          {!showResult ? (
            <>
              <div className="chats">
                {/* <div className="user">
                  <img src={avatar} alt="" />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora, assumenda.
                  </p>
                </div>
                <div className="bot">
                  <img src={logo} alt="" />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam, eum.
                  </p>
                </div> */}
                <div className="preLoad">
                  {/* <img src="/src/assets/chatbot.png" alt="" /> */}
                  <p>Hello, User</p>
                  <p>How can I help you today?</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="chats">
                <div className="user">
                  <img src={avatar} alt="" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="bot">
                  <img src={logo} alt="" />
                  {loading ? (
                    <>
                      <div className="lines">
                        <hr />
                        <hr />
                        <hr />
                      </div>
                    </>
                  ) : (
                    <>
                      <p
                        style={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="inputArea">
            <div className="inp">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Send a message"
                onKeyDown={handleKeyPress}
              />
              <img onClick={() => onSent()} src={send} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
