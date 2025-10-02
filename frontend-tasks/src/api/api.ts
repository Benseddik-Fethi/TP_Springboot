import axios from "axios";

export const API_URL = "http://localhost:8080/api";

export const api = axios.create({
    baseURL: API_URL,
});

// --- Projects ---
export const getProjects = () => api.get("/projects");
export const createProject = (project: { name: string; description: string }) =>
    api.post("/projects", project);

// --- Tasks ---
export const getTasks = () => api.get("/tasks");
export const createTask = (task: {
    title: string;
    description: string;
    status?: string;
    dueDate?: string;
    project: { id: number };
    assignedUser?: { id: number };
}) => api.post("/tasks", task);

export const updateTaskStatus = (taskId: number, status: string) =>
    api.put(`/tasks/${taskId}/status`, { status });

export const getTasksByProject = (projectId: number) =>
    api.get(`/projects/${projectId}/tasks`);

// --- Users ---
export const getUsers = () => api.get("/users");
export const createUser = (user: { name: string; email: string }) =>
    api.post("/users", user);
