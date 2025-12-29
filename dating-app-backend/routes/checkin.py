from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/check-in", tags=["Check-In"])

@router.post("/{qr_id}/{date_id}")
def check_in(
    qr_id: str, 
    date_id: int, 
    db: Session = Depends(get_db)
    # user = Depends(get_current_user) # Add this later for safety!
):
    # 1. Does this restaurant exist?
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.qr_id == qr_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not recognized")

    # 2. Does this date exist?
    date_record = db.query(models.Date).filter(models.Date.id == date_id).first()
    if not date_record:
        raise HTTPException(status_code=404, detail="Date session not found")

    # 3. Success! Mark the date as safe/checked-in
    date_record.status = "checked_in"
    db.commit()

    return {
        "message": "Check-in successful",
        "restaurant_name": restaurant.name,
        "date_status": date_record.status
    }