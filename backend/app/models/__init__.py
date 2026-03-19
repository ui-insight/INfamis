"""SQLAlchemy ORM models.

Import all models here so they are registered with Base.metadata.
"""

from app.models.project import Project

__all__ = ["Project"]
