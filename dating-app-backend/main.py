from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_
from pydantic import BaseModel
import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterRequest(BaseModel):
    email: str
    password: str
    username: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(email=request.email, username=request.username, hashed_password=request.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "user_id": new_user.id}

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.hashed_password != request.password:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"message": "Login successful", "user_id": user.id}

@app.get("/matches")
def get_matches(current_user_id: int, db: Session = Depends(get_db)):
    # Returns all users except the person logged in
    return db.query(models.User).filter(models.User.id != current_user_id).all()

@app.post("/dates/propose/{match_id}")
def propose_date(match_id: int, proposer_id: int, db: Session = Depends(get_db)):
    # match_id is the receiver, proposer_id is the sender
    new_date = models.Date(match_id=match_id, proposer_id=proposer_id, status="pending")
    db.add(new_date)
    db.commit()
    db.refresh(new_date)
    return new_date

@app.get("/dates/status/{match_id}")
def get_date_status(match_id: int, user_id: int, db: Session = Depends(get_db)):
    # Checks if a date exists between these two people
    date_entry = db.query(models.Date).filter(
        or_(
            (models.Date.proposer_id == user_id) & (models.Date.match_id == match_id),
            (models.Date.proposer_id == match_id) & (models.Date.match_id == user_id)
        )
    ).first()
    return date_entry

@app.post("/dates/accept/{date_id}")
def accept_date(date_id: int, db: Session = Depends(get_db)):
    date_entry = db.query(models.Date).filter(models.Date.id == date_id).first()
    if not date_entry:
        raise HTTPException(status_code=404, detail="Date not found")
    date_entry.status = "accepted"
    db.commit()
    return {"status": "accepted"}

@app.post("/dates/decline/{date_id}")
def decline_date(date_id: int, db: Session = Depends(get_db)):
    date_entry = db.query(models.Date).filter(models.Date.id == date_id).first()
    if not date_entry:
        raise HTTPException(status_code=404, detail="Date not found")
    date_entry.status = "declined"
    db.commit()
    return {"status": "declined"}