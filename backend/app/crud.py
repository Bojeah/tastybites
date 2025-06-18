# crud.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas
from .db import get_db
from typing import List

customer_router = APIRouter(prefix="/customers", tags=["customers"])
order_router = APIRouter(prefix="/orders", tags=["orders"])

@customer_router.get("/", response_model=List[schemas.Customer])
def get_customers(db: Session= Depends(get_db)) :
    return db.query(models.Customer).all()

@customer_router.get("/{customer_id}", response_model=schemas.Customer)
def get_customer_by_id(customer_id: int, db: Session= Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    return db_customer

@customer_router.post("/", status_code= status.HTTP_201_CREATED,response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session= Depends(get_db)):
    db_customer = models.Customer(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@customer_router.put("/{customer_id}", status_code=status.HTTP_202_ACCEPTED,response_model=schemas.Customer)
def update_customer(customer_id: int, customer: schemas.CustomerCreate, db: Session= Depends(get_db)):
    db_customer_query = db.query(models.Customer).filter(models.Customer.id == customer_id)
    db_customer = db_customer_query.first()
    if not db_customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    
    db_customer_query.update(customer.dict(), synchronize_session=False)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@customer_router.delete("/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(customer_id: int, db: Session= Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.id == customer_id)
    if not db_customer.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")
    db_customer.delete(synchronize_session=False)
    db.commit()

#orders
@order_router.get("/", response_model=List[schemas.Order])
def get_orders(db: Session= Depends(get_db)) :
    return db.query(models.Order).all()

@order_router.get("/{order_id}", response_model=schemas.Order)
def get_order_by_id(order_id: int, db: Session= Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return db_order

@order_router.post("/", status_code= status.HTTP_201_CREATED,response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session= Depends(get_db)):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@order_router.put("/{order_id}", status_code=status.HTTP_202_ACCEPTED,response_model=schemas.Order)
def update_order(order_id: int, order: schemas.OrderCreate, db: Session= Depends(get_db)):
    db_order_query = db.query(models.Order).filter(models.Order.id == order_id)
    db_order = db_order_query.first()
    if not db_order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    
    db_order_query.update(order.dict(), synchronize_session=False)
    db.commit()
    db.refresh(db_order)
    return db_order

@order_router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session= Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id)
    if not db_order.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    db_order.delete(synchronize_session=False)
    db.commit()