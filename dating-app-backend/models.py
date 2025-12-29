from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from database import Base 

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String) 
    hashed_password = Column(String) 
    feedback_submitted = Column(Boolean, default=False)

class Match(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    city = Column(String)

class DateProposal(Base):
    __tablename__ = "date_proposals"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    status = Column(String, default="pending")
    match = relationship("Match")

class Date(Base):
    __tablename__ = "dates"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    proposer_id = Column(Integer, ForeignKey("users.id"))
    receiver_id = Column(Integer, ForeignKey("users.id")) 
    status = Column(String, default="pending") 
    date_time = Column(DateTime) 
    match = relationship("Match")

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    cuisine = Column(String)
    location = Column(String)
    qr_id = Column(String, unique=True, index=True) 

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True)
    date_id = Column(Integer, ForeignKey("dates.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Integer)
    comments = Column(String)
    wants_second_date = Column(Boolean)