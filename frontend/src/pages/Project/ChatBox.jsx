import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { chat, auth } = useSelector((store) => store);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id]);

  useEffect(() => {
    if (chat.chat) {
      dispatch(fetchChatMessages(chat.chat?.id));
    }
  }, [chat.chat]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    dispatch(
      sendMessage({
        message: {
          senderId: auth.user?.id,
          projectId: id,
          content: message,
        },
        sendToServer: sendMessageToServer,
      })
    );
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat.messages]);

  const sendMessageToServer = (message) => {
    console.log(message);
  };

  return (
<div className="w-full max-w-3xl h-[85vh] mx-auto flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="border-b p-4 bg-gradient-to-r from-indigo-50 to-white">
        <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Project Chat
        </h1>
      </div>

      {/* Messages Area */}
      <ScrollArea
        ref={chatContainerRef}
        className="flex-1 px-5 py-4 space-y-6 bg-gradient-to-b from-white to-gray-50"
      >
        <AnimatePresence initial={false}>
          {chat.messages?.length > 0 ? (
            chat.messages.map((item, i) => (
              <motion.div
                key={`${item.id}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className={`flex items-end gap-3 ${
                  item.sender.id === auth.user.id ? "justify-end" : "justify-start"
                }`}
              >
                {item.sender.id !== auth.user.id && (
                  <Avatar className="h-9 w-9 ring-2 ring-green-400 shadow-md">
                    <AvatarImage src={item.sender.profilePicture} />
                    <AvatarFallback className="bg-gray-800 text-white">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`relative max-w-[70%] px-4 py-3 text-sm shadow-md rounded-2xl ${
                    item.sender.id === auth.user.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {item.sender.id !== auth.user.id && (
                    <p className="font-semibold text-xs mb-1 text-gray-600">
                      {item.sender.fullName}
                    </p>
                  )}
                  <p className="leading-snug whitespace-pre-wrap">{item.content}</p>
                </div>

                {item.sender.id === auth.user.id && (
                  <Avatar className="h-9 w-9 ring-2 ring-blue-400 shadow-md">
                    <AvatarImage src={item.sender.profilePicture} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-lg">
              <div className="bg-gray-100 p-4 rounded-full mb-3">
                <PaperPlaneIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No messages yet</h3>
              <p className="text-gray-500 text-sm mt-1">
                Start the conversation with your team
              </p>
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t p-3 bg-white">
        <div className="relative">
          <Input
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="pr-12 py-5 rounded-full border-gray-300 shadow-sm bg-white focus-visible:ring-2 focus-visible:ring-indigo-400 text-gray-800"
          />
          <Button
            onClick={handleSendMessage}
            disabled={message.trim() === ""}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
            size="icon"
            variant={message.trim() === "" ? "ghost" : "default"}
          >
            <PaperPlaneIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
