import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Import your updated chatbot CSS here

const API_KEY = "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"; 
const API_URL = "https://api.openai.com/v1/chat/completions";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleChat = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    setUserMessage('');
    setMessages([...messages, { text: trimmedMessage, type: 'outgoing' }]);

    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }

    setMessages([...messages, { text: trimmedMessage, type: 'outgoing' }, { text: 'Thinking...', type: 'incoming' }]);

    const response = await generateResponse(trimmedMessage);
    setMessages([...messages, { text: trimmedMessage, type: 'outgoing' }, { text: response, type: 'incoming' }]);
  };

  const generateResponse = async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch {
      return 'Oops! Something went wrong. Please try again.';
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">
          {isOpen ? '' : 'chat'}
        </span>
      </button>
      {isOpen && (
        <div className="chatbox" ref={chatboxRef}>
          <header>
            <h2>Chatbot</h2>
            <span className="close-btn" onClick={toggleChatbot}>
              <span className="material-symbols-outlined">close</span>
            </span>
          </header>
          <ul className="chat-messages">
            {messages.map((msg, index) => (
              <li key={index} className={`chat ${msg.type}`}>
                {msg.type === 'incoming' && (
                  <span className="material-symbols-outlined">
                    <i className="fa-regular fa-paper-plane"></i>
                  </span>
                )}
                <p>{msg.text}</p>
              </li>
            ))}
          </ul>
          <div className="chat-input">
            <textarea
              ref={inputRef}
              placeholder="Enter a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChat();
                }
              }}
            ></textarea>
            <span
              className="send-btn"
              onClick={handleChat}
            >
              <span className="material-symbols-rounded">send</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
