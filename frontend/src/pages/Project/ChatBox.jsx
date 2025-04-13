import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  messageRecived,
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
    // Auto-scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat.messages]);

  const sendMessageToServer = (message) => {
    console.log(message);
  };

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="border-b p-4 bg-gradient-to-r from-blue-50 to-purple-50">
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
        className="flex-1 p-4 space-y-4"
      >
        <AnimatePresence initial={false}>
          {chat.messages?.length > 0 ? (
            chat.messages.map((item, i) => (
              <motion.div
                key={`${item.id}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${item.sender.id === auth.user.id ? "justify-end" : "justify-start"}`}
              >
                {item.sender.id !== auth.user.id && (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.sender.profilePicture} />
                    <AvatarFallback className="bg-purple-100 text-purple-800">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${item.sender.id === auth.user.id 
                    ? "bg-primary text-white rounded-br-none" 
                    : "bg-gray-100 text-gray-800 rounded-bl-none"}`}
                >
                  {item.sender.id !== auth.user.id && (
                    <p className="font-medium text-sm mb-1">
                      {item.sender.fullName}
                    </p>
                  )}
                  <p className="text-sm">{item.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {item.sender.id === auth.user.id && (
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={item.sender.profilePicture} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {item.sender.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="bg-blue-50 p-4 rounded-full mb-3">
                <PaperPlaneIcon className="h-6 w-6 text-blue-400" />
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
      <div className="border-t p-3 bg-gray-50">
        <div className="relative">
          <Input
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="pr-12 py-5 rounded-full bg-white shadow-sm border-gray-300 focus-visible:ring-primary"
          />
          <Button
            onClick={handleSendMessage}
            disabled={message.trim() === ""}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10"
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