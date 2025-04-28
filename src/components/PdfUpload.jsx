import { useState } from "react";
import axios from "axios";

function PdfUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("업로드 중...");
      await axios.post("http://localhost:8000/upload-pdf", formData);
      setStatus("✅ 업로드 성공!");
    } catch (error) {
      setStatus("⚠️ 업로드 실패: 서버 오류");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>업로드</button>
      <p>{status}</p>
    </div>
  );
}

export default PdfUpload;
