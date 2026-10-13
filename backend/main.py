"""FastAPI backend for the "test" web application."""

import os
import platform
import time
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "test")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]

START_TIME = time.time()

app = FastAPI(
    title=f"{APP_NAME} API",
    version=APP_VERSION,
    description="REST API for the test web application.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str
    message: str
    service: str
    version: str
    python_version: str
    uptime_seconds: float
    timestamp: str


@app.get("/", tags=["root"])
def root() -> dict[str, str]:
    return {"message": f"Welcome to {APP_NAME} API. See /docs for documentation."}


@app.get("/api/health", response_model=HealthResponse, tags=["health"])
def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        message="Backend is running normally",
        service=APP_NAME,
        version=APP_VERSION,
        python_version=platform.python_version(),
        uptime_seconds=round(time.time() - START_TIME, 2),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
