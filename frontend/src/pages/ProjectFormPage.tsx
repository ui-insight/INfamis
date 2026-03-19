import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { createProject } from "../api/projects";
import type { ProjectCreate } from "../types/project";

const PROJECT_TYPES = [
  { value: "general", label: "General" },
  { value: "maintenance", label: "Maintenance" },
  { value: "repair", label: "Repair" },
  { value: "renovation", label: "Renovation" },
  { value: "new_construction", label: "New Construction" },
  { value: "space_modification", label: "Space Modification" },
];

const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

function ProjectFormPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectCreate>({
    title: "",
    description: "",
    requester_name: "",
    requester_email: "",
    requester_department: "",
    building: "",
    location_detail: "",
    project_type: "general",
    estimated_budget: undefined,
    priority: "medium",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "estimated_budget" ? (value ? Number(value) : undefined) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const project = await createProject(form);
      navigate(`/projects/${project.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link
          to="/projects"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &larr; Back to Projects
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          New Project Request
        </h1>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div>
          <label htmlFor="title" className={labelClass}>
            Project Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleChange}
            className={inputClass}
            placeholder="Brief title for the project"
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className={inputClass}
            placeholder="Detailed description of the work needed"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="requester_name" className={labelClass}>
              Your Name *
            </label>
            <input
              id="requester_name"
              name="requester_name"
              type="text"
              required
              value={form.requester_name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="requester_email" className={labelClass}>
              Your Email *
            </label>
            <input
              id="requester_email"
              name="requester_email"
              type="email"
              required
              value={form.requester_email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="requester_department" className={labelClass}>
            Department
          </label>
          <input
            id="requester_department"
            name="requester_department"
            type="text"
            value={form.requester_department}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="building" className={labelClass}>
              Building
            </label>
            <input
              id="building"
              name="building"
              type="text"
              value={form.building}
              onChange={handleChange}
              className={inputClass}
              placeholder="Building name or number"
            />
          </div>
          <div>
            <label htmlFor="location_detail" className={labelClass}>
              Location Detail
            </label>
            <input
              id="location_detail"
              name="location_detail"
              type="text"
              value={form.location_detail}
              onChange={handleChange}
              className={inputClass}
              placeholder="Room, floor, area"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="project_type" className={labelClass}>
              Project Type
            </label>
            <select
              id="project_type"
              name="project_type"
              value={form.project_type}
              onChange={handleChange}
              className={inputClass}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className={inputClass}
            >
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="estimated_budget" className={labelClass}>
              Estimated Budget ($)
            </label>
            <input
              id="estimated_budget"
              name="estimated_budget"
              type="number"
              min="0"
              step="0.01"
              value={form.estimated_budget ?? ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            to="/projects"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectFormPage;
