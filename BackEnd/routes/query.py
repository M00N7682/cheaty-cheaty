from fastapi import APIRouter, Body
from pydantic import BaseModel
from ..services.qa_engine import get_qa_chain

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

@router.post("/query")
async def query_pdf(request: QueryRequest):
    qa = get_qa_chain()
    answer = qa.run(request.question)
    return {"question": request.question, "answer": answer}
