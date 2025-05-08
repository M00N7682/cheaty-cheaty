from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from BackEnd.routes import upload, query

app = FastAPI()

# CORS 설정 (React에서 접근 가능하도록)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(query.router)  # ← query API 등록
