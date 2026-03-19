export interface Project {
  id: number;
  title: string;
  description: string | null;
  requester_name: string;
  requester_email: string;
  requester_department: string | null;
  building: string | null;
  location_detail: string | null;
  project_type: string;
  estimated_budget: number | null;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  title: string;
  description?: string;
  requester_name: string;
  requester_email: string;
  requester_department?: string;
  building?: string;
  location_detail?: string;
  project_type?: string;
  estimated_budget?: number;
  priority?: string;
}

export interface ProjectUpdate {
  title?: string;
  description?: string;
  requester_name?: string;
  requester_email?: string;
  requester_department?: string;
  building?: string;
  location_detail?: string;
  project_type?: string;
  estimated_budget?: number;
  priority?: string;
  status?: string;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
}
