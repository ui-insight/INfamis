"""Pydantic schemas for project intake."""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


ProjectType = Literal[
    "maintenance",
    "repair",
    "renovation",
    "new_construction",
    "space_modification",
    "general",
]

Priority = Literal["low", "medium", "high", "urgent"]

Status = Literal[
    "submitted",
    "under_review",
    "approved",
    "in_progress",
    "completed",
    "cancelled",
]


class ProjectCreate(BaseModel):
    title: str
    description: str | None = None
    requester_name: str
    requester_email: str
    requester_department: str | None = None
    building: str | None = None
    location_detail: str | None = None
    project_type: ProjectType = "general"
    estimated_budget: float | None = None
    priority: Priority = "medium"


class ProjectUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    requester_name: str | None = None
    requester_email: str | None = None
    requester_department: str | None = None
    building: str | None = None
    location_detail: str | None = None
    project_type: ProjectType | None = None
    estimated_budget: float | None = None
    priority: Priority | None = None
    status: Status | None = None


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None
    requester_name: str
    requester_email: str
    requester_department: str | None
    building: str | None
    location_detail: str | None
    project_type: str
    estimated_budget: float | None
    priority: str
    status: str
    created_at: datetime
    updated_at: datetime


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total: int
