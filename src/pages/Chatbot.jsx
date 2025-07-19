import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { BsXCircleFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { apiConnect } from '../services/apiconnect';
import { ChatbotApi } from '../services/apis';
import { RiRobot3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
const ChatBot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position , setPosition] = useState(false)

    useEffect(() => {
       const handleScroll = () => {
         if (window.scrollY > 200) {
           setPosition(true);
         } else {
           setPosition(false);
         }
       };
   
       window.addEventListener("scroll", handleScroll);
       return () => window.removeEventListener("scroll", handleScroll);
     }, []);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const generateAnswer = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const userMessage = { text: trimmedQuestion, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      // const response = await axios.post('http://localhost:3000/scholarX/Chatbot', {
      //   question: trimmedQuestion,
      // });
      const response = await  apiConnect("POST" , ChatbotApi.CHATBOT_API , {question: trimmedQuestion})

      const botReply = response.data.answer?.trim() || 'No response';
      const botMessage = { text: botReply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { text: 'Something went wrong 😢', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  return (
    <div className='z-[200]'>
      {/* Floating Chat Icon */}

      
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed ${position ? "right-[80px]" : "right-5"} bottom-6 border-2 ease-in-out duration-700 border-white  z-50 p-3 rounded-full text-white s transition-all
          bg-[#161D30]
          
        `}
        style={{
         
          cursor: 'pointer',
        }}
      >
        {isOpen ? < RxCross2 size={22} /> : <FaRobot size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-28  transition-all ease-in-out duration-700 ${position ? "right-[80px]" : "right-5"}  z-50 w-80 max-w-[90vw] h-[500px] flex flex-col bg-gray-900 border border-white rounded-xl shadow-xl overflow-hidden`}>
          <div className="bg-[#161D30] border-b-1 border-white  text-white text-center py-3 rounded-t-xl font-semibold text-lg">
            🤖 ScholarX AI
          </div>

          {/* <div className="rec absolute bg0 h-10 w-10 rotate-45 border-1 border-white bg-gray-900 bottom-2 z-[200]">

          </div> */}
          {/* Pointer below chatbox */}
<div className={`fixed bottom-[103px]  transition-all ease-in-out duration-700  ${position ? "right-[100px]" : "right-10"}   w-7 h-7 bg-gray-800 rotate-45 border-r border-b border-white -z-10`} />


          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#000814]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm break-words ${
                  msg.sender === 'user'
                    ? 'bg-gray-700 text-white max-w-max self-end ml-auto text-right shadow-md'
                    : 'bg-gray-800 text-gray-300 self-start mr-auto text-left shadow-inner'
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg w-fit text-sm">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white flex gap-2 bg-gray-800">
            <input
              type="text"
              className="flex-1 p-2 bg-gray-700 text-white border border-white rounded text-sm focus:outline-none"
              placeholder="Type your message..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
            />
            <button
              onClick={generateAnswer}
              disabled={loading}
              className="bg-[#161D30] border-1 border-white cursor-pointer text-white px-3 py-2 rounded hover:bg-gray-800 disabled:opacity-50 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default ChatBot;
