# schemas.py

from pydantic import BaseModel, validator, Field
from typing import Optional, List
from datetime import datetime, date

class OrderBase(BaseModel):
    menu_item: str
    special_instructions: Optional[str]
    payment_method: str
    next_reservation: datetime
    total_amount: int
    order_date: date
    customer_id: int

class OrderCreate(BaseModel):
    menu_item: str
    special_instructions: Optional[str]
    payment_method: str
    next_reservation: datetime
    total_amount: int
    customer_id: int

class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True          # ← enable ORM mode

class CustomerBase(BaseModel):
    first_name: str
    surname: str
    middle_name: Optional[str]
    dob: date
    address: str
    registration_date: date
    matric_no: Optional[bool] = True

    @validator("dob", pre=True)
    def parse_dob(cls, v):
        if isinstance(v, str) and "/" in v:
            d, m, y = v.split("/")
            return f"{y}-{m.zfill(2)}-{d.zfill(2)}"
        return v

    @validator("registration_date", pre=True)
    def parse_registration_date(cls, v):
        if isinstance(v, str) and "/" in v:
            d, m, y = v.split("/")
            return f"{y}-{m.zfill(2)}-{d.zfill(2)}"
        return v

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    orders: List[Order] = []

    class Config:
        orm_mode = True          # ← enable ORM mode
