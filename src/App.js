import { useState } from "react";
import ChatBox from "./components/ChatBox";
import PdfUpload from "./components/PdfUpload";

function App() {
  const [selectedTab, setSelectedTab] = useState("chat");

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>📄 Cheaty Cheaty</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setSelectedTab("chat")}>💬 질문하기</button>
        <button onClick={() => setSelectedTab("upload")}>📂 PDF 추가</button>
      </div>

      {selectedTab === "chat" && <ChatBox />}
      {selectedTab === "upload" && <PdfUpload />}
    </div>
  );
}

export default App;
