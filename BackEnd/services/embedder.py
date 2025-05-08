from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.docstore.document import Document
from dotenv import load_dotenv
import os

# ✅ .env 파일 경로 명시적으로 지정
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)

# 🔑 환경 변수에서 API Key 불러오기
api_key = os.getenv("OPENAI_API_KEY")

def process_and_store_embeddings(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    chunks = splitter.split_text(text)
    docs = [Document(page_content=c) for c in chunks]

    embeddings = OpenAIEmbeddings(openai_api_key=api_key)
    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local("faiss_index")
