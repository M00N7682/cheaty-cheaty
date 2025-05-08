import os
from dotenv import load_dotenv
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# .env 로딩
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=env_path)
api_key = os.getenv("OPENAI_API_KEY")

def get_qa_chain():
    # 저장된 벡터 불러오기
    vectorstore = FAISS.load_local("faiss_index", OpenAIEmbeddings(openai_api_key=api_key), allow_dangerous_deserialization=True)

    # LLM + 벡터 검색 결합
    qa = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(model_name="gpt-3.5-turbo", openai_api_key=api_key),
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )
    return qa
