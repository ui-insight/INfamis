import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getProject, updateProject, deleteProject } from "../api/projects";
import type { Project } from "../types/project";

const STATUSES = [
  "submitted",
  "under_review",
  "approved",
  "in_progress",
  "completed",
  "cancelled",
];

const statusStyles: Record<string, string> = {
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-purple-100 text-purple-800",
  approved: "bg-green-100 text-green-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

const priorityStyles: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

function formatLabel(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProject(Number(id))
      .then((data) => {
        setProject(data);
        setNewStatus(data.status);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusUpdate() {
    if (!project || newStatus === project.status) return;
    setUpdating(true);
    try {
      const updated = await updateProject(project.id, { status: newStatus });
      setProject(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!project || !confirm("Are you sure you want to delete this request?"))
      return;
    try {
      await deleteProject(project.id);
      navigate("/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error || !project) {
    return (
      <div>
        <Link
          to="/projects"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back to Projects
        </Link>
        <p className="mt-4 text-red-600">{error || "Project not found"}</p>
      </div>
    );
  }

  const fields = [
    { label: "Requester", value: project.requester_name },
    { label: "Email", value: project.requester_email },
    { label: "Department", value: project.requester_department },
    { label: "Building", value: project.building },
    { label: "Location", value: project.location_detail },
    { label: "Project Type", value: formatLabel(project.project_type) },
    {
      label: "Estimated Budget",
      value: project.estimated_budget
        ? `$${project.estimated_budget.toLocaleString()}`
        : null,
    },
    { label: "Submitted", value: formatDate(project.created_at) },
    { label: "Last Updated", value: formatDate(project.updated_at) },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/projects"
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        &larr; Back to Projects
      </Link>

      <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.title}
              </h1>
              <div className="mt-2 flex gap-2">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    statusStyles[project.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {formatLabel(project.status)}
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    priorityStyles[project.priority] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {formatLabel(project.priority)} Priority
                </span>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>

        {project.description && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-500 mb-1">
              Description
            </h2>
            <p className="text-gray-900 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        )}

        <div className="px-6 py-4 border-b border-gray-200">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map(
              (field) =>
                field.value && (
                  <div key={field.label}>
                    <dt className="text-sm font-medium text-gray-500">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {field.value}
                    </dd>
                  </div>
                )
            )}
          </dl>
        </div>

        <div className="px-6 py-4">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Update Status
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {formatLabel(s)}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={updating || newStatus === project.status}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
