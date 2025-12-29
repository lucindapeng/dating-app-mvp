from pydantic import BaseModel
from datetime import datetime
from pydantic import BaseModel

class DateResponse(BaseModel):
    id: int
    status: str

    model_config = {
        "from_attributes": True
    }

class LoginRequest(BaseModel):
    email: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str

class MatchOut(BaseModel):
    id: int
    name: str
    age: int
    city: str

    class Config:
        from_attributes = True

class DateProposalCreate(BaseModel):
    match_id: int

class DateProposalOut(BaseModel):
    id: int
    match: MatchOut
    status: str

    class Config:
        orm_mode = True

class FeedbackSubmission(BaseModel):
    date_id: int
    rating: int
    comments: str | None = None
    wants_second_date: bool
    second_date: bool

    class Config:
        from_attributes = True
