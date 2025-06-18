# models.py

from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, DateTime, text
from sqlalchemy.sql.sqltypes import TIMESTAMP as Timestamp
from sqlalchemy.orm import relationship
from .db import Base

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    surname = Column(String)
    middle_name = Column(String)
    dob = Column(Date)
    address = Column(String)
    registration_date = Column(Date)
    matric_no = Column(Boolean, default=True)
    orders = relationship("Order", back_populates="customer", cascade="all, delete-orphan")
    
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    order_date = Column(Timestamp(timezone=True), server_default=text('now()'), nullable=False)
    menu_item = Column(String)
    special_instructions = Column(String)
    payment_method = Column(String)
    next_reservation = Column(DateTime)
    total_amount= Column(Integer)  
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"))

    customer = relationship("Customer", back_populates="orders")