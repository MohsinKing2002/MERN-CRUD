import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, loadUser, logoutUser } from "../Actions/User";
import { Loader } from "./Utils/Loader";
import { BiUserPin, BiEnvelope, BiCheckShield } from "react-icons/bi";
import { ImMobile2 } from "react-icons/im";
import axios from "axios";
import { Client } from "@twilio/conversations";

const chatroom = "CHd8b78c75fb98476f964b096864da2660";

function Profile() {
  const {
    state: { name },
  } = useLocation();
  //   const navigate = useNavigate();
  const [token, setToken] = useState("");
  //   const [messegee, setMessage] = useState("");
  const [Clientt, setClientt] = useState(null);
  const conversation = useRef();
  const [chatHistory, setChatHistory] = useState([]);
  const [convo, setConvo] = useState("");
  //   const [Conversationn, setConversationn] = useState(null);
  //   const [allMessages, setAllMessages] = useState([]);
  //   const [allconvos, setallconvos] = useState([]);

  // useEffect(() => {
  //   if (token != "") initializeTwilio(token);
  // }, [token]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = (
      await axios.post(
        "/chat/token",
        { identity: name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data.token;
    setToken(token);
    initializeTwilio(token);
  };

  const initializeTwilio = (token) => {
    const client = new Client(token);
    client.on("stateChanged", (state) => {
      if (state === "failed") {
        // The client failed to initialize
        return;
      }

      if (state === "initialized") {
        console.log("initialized");
        setClientt(client);
        //createConversation();
        // Use the client
      }
    });
    // client.on("conversationAdded", (conversation) => {
    //   console.log("new conv", conversation);
    //   setallconvos((prev) => [...prev, conversation]);
    // });
  };

  const createConversation = async () => {
    if (!Clientt) return;
    try {
      //   const conversation = await Clientt.createConversation({
      //     friendlyName: "ChannelName",
      //   });
      // await conversation.join();
      // await conversation.add("user2");

      conversation.current = await Clientt.getConversationBySid(chatroom);
      const messages = await conversation.current.getMessages();
      setChatHistory(messages.items.map((i) => i.state));

      conversation.current.on("messageAdded", (message) => {
        setChatHistory((prev) => [...prev, message.state]);
      });
    } catch (error) {
      console.log("create conv", error);
    }
  };

  const handleSend = () => {
    if (convo) {
      conversation.current
        .sendMessage(convo)
        .then(() => {
          setConvo("");
        })
        .catch((e) => console.log("Failed to send message :", e));
    }
  };

  return (
    <Card className="card chat">
      <h1>Me : {name}</h1>
      <div>
        {chatHistory.length > 0 ? (
          <div>
            {chatHistory.map((chat) => {
              return (
                <p>
                  {chat.author} : {chat.body}
                </p>
              );
            })}
          </div>
        ) : (
          <button onClick={createConversation}>Join Conversation</button>
        )}
      </div>
      <input
        type="text"
        name="convo"
        value={convo}
        onChange={(e) => setConvo(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </Card>
  );
}

export default Profile;

/*
 * TO DO
 * -- Create user token by user_id from mongo.
 * -- If channel does not exist. Then create channel between business & customer and store the sid, business id , customer id in DB.
 * -- Each consecutive time, join the channel sid.
 * -- On dashboard page open, loop through each customer / business and fetch respective unread count.
 */
