import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, loadUser, logoutUser } from "../Actions/User";
import { Loader } from "./Utils/Loader";
import { BiUserPin, BiEnvelope, BiCheckShield } from "react-icons/bi";
import { ImMobile2 } from "react-icons/im";
import axios from "axios";
import { Client } from "@twilio/conversations";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [messegee, setMessage] = useState("");
  const [Clientt, setClientt] = useState(null);
  const [Conversationn, setConversationn] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [allconvos, setallconvos] = useState([]);

  const getToken = async () => {
    const token = (
      await axios.post(
        "/chat/token",
        { identity: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data.token;
    setToken(token);
  };

  // console.log("clnt", Clientt);
  const createConversation = async (id) => {
    if (!Clientt) return;

    try {
      let conversation = await Clientt.createConversation({
        friendlyName: `${user._id}_${id}`,
      });

      await conversation.join();
      await conversation.add(id);

      setConversationn(conversation);

      conversation.on("messageAdded", (message) => {
        console.log("message added");
        setAllMessages((msgs) => [...msgs, message]);
      });
    } catch (error) {
      console.log("create conv", error);
    }
  };

  const joinConversation = async (convo, id) => {
    if (!convo) return;
    try {
      const res = await convo.add(id);
    } catch (error) {
      console.log("join err", error);
    } finally {
      setConversationn(convo);
    }
  };

  console.log("curr conv", Conversationn);
  console.log("all conv", allconvos);
  console.log("msg", allMessages);
  const sendMessages = async () => {
    if (!Conversationn) return;
    try {
      // await Conversationn.prepareMessage()
      //   .setBody(messegee)
      //   .setAttributes({ foo: "bar" })
      //   .build()
      //   .send();
      await Conversationn.sendMessage(messegee);
      setMessage("");
      // recieveMessages();
    } catch (err) {
      console.log("send message err", err);
    }
  };

  const recieveMessages = async () => {
    if (!Conversationn) return;
    try {
      console.log("called");
      let paginator = await Conversationn.getMessages();

      const messages = paginator.items;
      setAllMessages(messages);
    } catch (err) {
      console.log("send message err", err);
    }
  };

  const initializeTwilio = (token) => {
    const client = new Client(token);
    client.on("stateChanged", (state) => {
      if (state === "failed") {
        // The client failed to initialize
      }

      if (state === "initialized") {
        setClientt(client);
        // Use the client
      }
    });
    client.on("conversationAdded", (conversation) => {
      console.log("new conv", conversation);
      setallconvos((prev) => [...prev, conversation]);
    });
  };

  useEffect(() => {
    if (token != "") initializeTwilio(token);
  }, [token]);

  useEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {
  //   recieveMessages();
  // }, [Conversationn]);

  return loading ? (
    <Loader />
  ) : (
    <Card className="card chat">
      {!Conversationn && (
        <button
          onClick={() => {
            createConversation("66269f542db78c70481987eb");
          }}
        >
          Create
        </button>
      )}
      {allconvos?.length > 0 &&
        allconvos.map((item) => (
          <button
            onClick={() => {
              joinConversation(item, user._id);
            }}
          >
            join @ {item?.friendlyName}
          </button>
        ))}
      <div className="chat_box">
        {allMessages?.length > 0 &&
          allMessages.map((msg) => (
            <div className="chat_content">
              <p style={{ fontSize: "12px" }}>
                {msg?.author == user._id ? "You" : "Other"}
              </p>
              <p>{msg?.body}</p>
              {/* <p className="text-xs text-label">
                {moment(msg?.dateCreated).format("DD MMM HH:MM A")}
              </p> */}
            </div>
          ))}
      </div>
      <div className="chat_input">
        <input
          type="text"
          style={{
            padding: "10px",
            border: "1px solid gray",
          }}
          value={messegee}
          placeholder="youre message here ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          onClick={sendMessages}
          style={{ width: "80px" }}
          variant="primary"
        >
          Send
        </Button>
      </div>
    </Card>
  );
}

export default Profile;
