# # main.py

# from fastapi import FastAPI
# from random import randrange
# import psycopg2
# from psycopg2.extras import RealDictCursor
# import time
# from . import models
# from .db import engine
# from . import crud

# while True:
#     try:
#         conn = psycopg2.connect(host="localhost",dbname="fastapi",user="postgres",password="cos101",cursor_factory=RealDictCursor)                          
#         cursor = conn.cursor()
#         print("Database connection successful")
#         break
#     except Exception as error:
#         print("Failed to connect to database")
#         print("Error:", error)
#         time.sleep(2)

# models.Base.metadata.create_all(bind=engine)
# app = FastAPI()

# app.include_router(crud.router)

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the FastAPI application!"}


from fastapi import FastAPI
from . import models
from .db import engine
from . import crud
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

# Allow requests from frontend origin
origins = [
    "http://localhost:5173",  # Vite dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],    # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],    # Allow all headers
)

app.include_router(crud.customer_router)
app.include_router(crud.order_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}