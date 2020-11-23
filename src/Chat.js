import React, { useEffect, useState } from "react";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { PhotoCamera, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

const useStyles = makeStyles(() => ({
    input: {
      display: 'none',
    },
  }));

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const classes = useStyles();
    const [baseImage, setBaseImage] = useState("");

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
              .doc(roomId)
              .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy('timestamp', 'asc')
              .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
              );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed ", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
        setBaseImage("");
    };

    const uploadFile = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);

        const fileType = file.type;

        // specify what are the possible file types image/jpeg, image/jpg, image/png
        if (fileType.indexOf("image") !== -1) {
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: "image",
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                image: base64,
                fileType: fileType,
            });
        } 

        // audio/wav, audio/mp3
        if (fileType.indexOf("audio") !== -1) {
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: "audio",
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                audio: base64,
                fileType: fileType,
            });
        }

        if (fileType.indexOf("video") !== -1) {
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: "",
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                video: base64,
                fileType: fileType,
            });
        }
    };

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()} 
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <input accept="image/*,video/*,audio/*" 
                               className={classes.input} 
                               id="icon-button-file" 
                               type="file" 
                               onChange={(e) => {
                            uploadFile(e);
                        }} />
                        <label htmlFor="icon-button-file">
                        <PhotoCamera />
                        </label>
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.image ? <img src={message.image} height="100px" alt="" /> : 
                    message.audio ? <audio controls><source src={message.audio} type={message.fileType}></source></audio> : 
                    message.video ? <video width="240" height="180" controls><source src={message.video} type={message.fileType}></source></video> :
                    <>{message.message}</>}
                    
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))} 
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        type="text" 
                        placeholder="Type a message"
                    />
                    
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
