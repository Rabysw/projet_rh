from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, Float, Enum
import enum
from datetime import datetime
from db_client import Base

class LeaveStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Leave(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    type = Column(String) # ex: 'Annuel', 'Maladie'
    start_date = Column(Date)
    end_date = Column(Date)
    nb_days = Column(Integer)
    status = Column(String, default=LeaveStatus.PENDING)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    manager_comment = Column(String, nullable=True)
    approved_by = Column(Integer, nullable=True)