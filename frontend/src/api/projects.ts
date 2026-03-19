import { api } from "./client";
import type {
  Project,
  ProjectCreate,
  ProjectListResponse,
  ProjectUpdate,
} from "../types/project";

export function listProjects(
  params?: Record<string, string>
): Promise<ProjectListResponse> {
  return api.get<ProjectListResponse>("/projects/", params);
}

export function getProject(id: number): Promise<Project> {
  return api.get<Project>(`/projects/${id}`);
}

export function createProject(data: ProjectCreate): Promise<Project> {
  return api.post<Project>("/projects/", data);
}

export function updateProject(
  id: number,
  data: ProjectUpdate
): Promise<Project> {
  return api.patch<Project>(`/projects/${id}`, data);
}

export function deleteProject(id: number): Promise<void> {
  return api.delete<void>(`/projects/${id}`);
}
