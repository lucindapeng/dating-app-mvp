from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import uuid

from database import get_db
from models.restaurant import Restaurant

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/add-restaurant")
def add_restaurant(name: str, db: Session = Depends(get_db)):
    restaurant = Restaurant(
        name=name,
        qr_id=str(uuid.uuid4())
    )
    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)

    return restaurant
