from fastapi import APIRouter, UploadFile, File
import os
from ..services.pdf_parser import extract_text_from_pdf
from ..services.embedder import process_and_store_embeddings


router = APIRouter()

@router.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # 저장 경로
    save_path = f"uploaded/{file.filename}"
    os.makedirs("uploaded", exist_ok=True)

    # 파일 저장
    with open(save_path, "wb") as f:
        f.write(await file.read())

    # 텍스트 추출
    text = extract_text_from_pdf(save_path)

    # 임베딩 및 FAISS 저장
    process_and_store_embeddings(text)

    return {"status": "success", "filename": file.filename}
