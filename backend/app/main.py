from fastapi import FastAPI
from . import models
from .db import engine
from . import crud
from fastapi.middleware.cors import CORSMiddleware

# Only run once, not every restart
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://tastybites.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(crud.customer_router, prefix="/api")
app.include_router(crud.order_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}
