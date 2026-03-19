"""Tests for project intake API endpoints."""

import pytest

VALID_PROJECT = {
    "title": "Fix HVAC in Admin Building",
    "description": "The HVAC system on the 3rd floor is not cooling properly.",
    "requester_name": "Jane Doe",
    "requester_email": "jane@uidaho.edu",
    "requester_department": "Facilities",
    "building": "Administration Building",
    "location_detail": "3rd Floor, Room 310",
    "project_type": "repair",
    "estimated_budget": 15000.00,
    "priority": "high",
}


async def test_create_project(client):
    resp = await client.post("/api/v1/projects/", json=VALID_PROJECT)
    assert resp.status_code == 201
    data = resp.json()
    assert data["id"] is not None
    assert data["title"] == VALID_PROJECT["title"]
    assert data["status"] == "submitted"
    assert data["created_at"] is not None


async def test_create_project_minimal(client):
    resp = await client.post(
        "/api/v1/projects/",
        json={
            "title": "Quick fix",
            "requester_name": "John",
            "requester_email": "john@uidaho.edu",
        },
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["project_type"] == "general"
    assert data["priority"] == "medium"
    assert data["status"] == "submitted"


async def test_create_project_invalid_priority(client):
    payload = {**VALID_PROJECT, "priority": "critical"}
    resp = await client.post("/api/v1/projects/", json=payload)
    assert resp.status_code == 422


async def test_list_projects_empty(client):
    resp = await client.get("/api/v1/projects/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["projects"] == []
    assert data["total"] == 0


async def test_list_projects(client):
    await client.post("/api/v1/projects/", json=VALID_PROJECT)
    await client.post(
        "/api/v1/projects/",
        json={**VALID_PROJECT, "title": "Roof Repair"},
    )
    resp = await client.get("/api/v1/projects/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total"] == 2
    assert len(data["projects"]) == 2


async def test_get_project(client):
    create_resp = await client.post("/api/v1/projects/", json=VALID_PROJECT)
    project_id = create_resp.json()["id"]
    resp = await client.get(f"/api/v1/projects/{project_id}")
    assert resp.status_code == 200
    assert resp.json()["title"] == VALID_PROJECT["title"]


async def test_get_project_not_found(client):
    resp = await client.get("/api/v1/projects/9999")
    assert resp.status_code == 404


async def test_update_project(client):
    create_resp = await client.post("/api/v1/projects/", json=VALID_PROJECT)
    project_id = create_resp.json()["id"]
    resp = await client.patch(
        f"/api/v1/projects/{project_id}",
        json={"status": "under_review", "priority": "urgent"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "under_review"
    assert data["priority"] == "urgent"
    assert data["title"] == VALID_PROJECT["title"]


async def test_update_project_not_found(client):
    resp = await client.patch(
        "/api/v1/projects/9999",
        json={"status": "approved"},
    )
    assert resp.status_code == 404


async def test_delete_project(client):
    create_resp = await client.post("/api/v1/projects/", json=VALID_PROJECT)
    project_id = create_resp.json()["id"]
    resp = await client.delete(f"/api/v1/projects/{project_id}")
    assert resp.status_code == 204
    resp = await client.get(f"/api/v1/projects/{project_id}")
    assert resp.status_code == 404


async def test_delete_project_not_found(client):
    resp = await client.delete("/api/v1/projects/9999")
    assert resp.status_code == 404
