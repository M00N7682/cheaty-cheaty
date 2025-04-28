import { useState, useRef, useEffect } from "react";

function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ 서버 오류: 답변을 가져올 수 없습니다." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="input-area">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="무엇이든 물어보세요..."
        />
        <button onClick={handleSend}>➤</button>
      </div>

      <style jsx="true">{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 90vh;
          max-width: 800px;
          margin: 0 auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background-color: #f9f9f9;
        }
        .chat-window {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #fff;
        }
        .message {
          display: flex;
          margin-bottom: 10px;
        }
        .message.user {
          justify-content: flex-end;
        }
        .message.bot {
          justify-content: flex-start;
        }
        .message-content {
          max-width: 70%;
          padding: 10px 15px;
          border-radius: 20px;
          line-height: 1.4;
        }
        .message.user .message-content {
          background-color: #0084ff;
          color: white;
          border-bottom-right-radius: 0;
        }
        .message.bot .message-content {
          background-color: #e5e5ea;
          color: black;
          border-bottom-left-radius: 0;
        }
        .input-area {
          display: flex;
          border-top: 1px solid #ddd;
          padding: 10px;
          background-color: #f9f9f9;
        }
        .input-area textarea {
          flex: 1;
          resize: none;
          border: 1px solid #ccc;
          border-radius: 20px;
          padding: 10px;
          margin-right: 10px;
          font-size: 16px;
        }
        .input-area button {
          background-color: #0084ff;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .input-area button:hover {
          background-color: #006fe0;
        }
      `}</style>
    </div>
  );
}

export default ChatBox;
