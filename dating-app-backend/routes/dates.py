from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Date
from schemas import DateResponse
from auth import get_current_user  # or security later

router = APIRouter(prefix="/dates", tags=["Dates"])


@router.get("/my", response_model=list[DateResponse])
def get_my_dates(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(Date).filter(Date.proposer_id == user.id).all()



@router.post("/accept/{date_id}", response_model=DateResponse)
def accept_date(
    date_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    date = db.query(Date).filter(Date.id == date_id).first()

    if not date:
        raise HTTPException(status_code=404, detail="Date not found")

    date.status = "accepted"
    db.commit()
    db.refresh(date)
    return date


@router.post("/decline/{date_id}", response_model=DateResponse)
def decline_date(
    date_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    date = db.query(Date).filter(Date.id == date_id).first()

    if not date:
        raise HTTPException(status_code=404, detail="Date not found")

    date.status = "declined"
    db.commit()
    db.refresh(date)
    return date
