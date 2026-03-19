"""Project intake model."""

from sqlalchemy import Column, DateTime, Float, Integer, String, Text
from sqlalchemy.sql import func

from app.db.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    requester_name = Column(String(150), nullable=False)
    requester_email = Column(String(254), nullable=False)
    requester_department = Column(String(150), nullable=True)
    building = Column(String(150), nullable=True)
    location_detail = Column(String(300), nullable=True)
    project_type = Column(String(50), nullable=False, default="general")
    estimated_budget = Column(Float, nullable=True)
    priority = Column(String(20), nullable=False, default="medium")
    status = Column(String(30), nullable=False, default="submitted")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
