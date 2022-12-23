// import { useState } from "react";
// import Dialogs from "./Dialogs";
//
// let dialogsData = [
//     {
//         id: 1,
//         name: "Hlib",
//     },
//     {
//         id: 2,
//         name: "Andrii",
//     },
//     {
//         id: 3,
//         name: "Slava",
//     },
//     {
//         id: 4,
//         name: "Mykyta",
//     },
// ];
//
// let messagesData = [
//     {
//         id: 1,
//         message: "Hello",
//     },
//     {
//         id: 2,
//         message: "Heey",
//     },
//     {
//         id: 3,
//         message: "Wasap",
//     },
//     {
//         id: 4,
//         message: "Phhhhhhh",
//     },
// ];
//
// const DialogsContainer = () => {
//     const [dialogs, setDialogs] = useState(dialogsData);
//     const [messages, setMessages] = useState(messagesData);
//     const [inputText, setInputText] = useState("");
//     console.log("inputText", inputText);
//     console.log("messages", messages);
//
//     const sendMessage = () => {
//         setMessages((prevMessage) => [
//             ...prevMessage,
//             {
//                 id: prevMessage[prevMessage.length - 1].id + 1,
//                 message: inputText,
//             },
//         ]);
//         setInputText("");
//     };
//
//     const inputChange = (e) => {
//         setInputText(e.target.value);
//     };
//
//     return (
//         <Dialogs
//             dialogs={dialogs}
//             messages={messages}
//             inputChange={inputChange}
//             inputText={inputText}
//             sendMessage={sendMessage}
//         />
//     );
// };
//
// export default DialogsContainer;
