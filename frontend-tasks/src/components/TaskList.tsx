import { useEffect, useState } from "react";
import {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    getUsers,
} from "../api/api";

interface Task {
    id: number;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    dueDate?: string;
    assignedUser?: { id: number; name: string };
}

interface User {
    id: number;
    name: string;
}

export default function TaskList({ projectId }: { projectId: number }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assigned, setAssigned] = useState<number | "">("");

    useEffect(() => {
        if (projectId) {
            getTasksByProject(projectId).then((res) => setTasks(res.data));
            getUsers().then((res) => setUsers(res.data));
        }
    }, [projectId]);

    const handleAdd = async () => {
        if (!title.trim()) return;
        const res = await createTask({
            title,
            description: desc,
            project: { id: projectId },
            assignedUser: assigned ? { id: Number(assigned) } : undefined,
            dueDate: dueDate || undefined,
        });
        setTasks([...tasks, res.data]);
        setTitle("");
        setDesc("");
        setDueDate("");
        setAssigned("");
    };

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        const res = await updateTaskStatus(taskId, newStatus);
        setTasks(tasks.map((t) => (t.id === taskId ? res.data : t)));
    };

    return (
        <div className="p-4 bg-white shadow rounded mt-6">
            <h2 className="text-xl font-bold mb-2">Tâches du projet</h2>
            <ul className="mb-4">
                {tasks.map((t) => (
                    <li
                        key={t.id}
                        className="border-b py-2 flex justify-between items-center"
                    >
                        <div>
                            <b>{t.title}</b> ({t.status})
                            <div className="text-sm text-gray-600">{t.description}</div>
                            <div className="text-sm text-blue-600">
                                {t.assignedUser
                                    ? `Assigné à : ${t.assignedUser.name}`
                                    : "Non assignée"}
                            </div>
                            <div className="text-sm text-gray-500">
                                {t.dueDate
                                    ? `Échéance : ${t.dueDate}`
                                    : "Pas de date"}
                            </div>
                        </div>
                        <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value)}
                            className="border rounded p-1"
                        >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </li>
                ))}
            </ul>

            <h3 className="font-semibold mb-2">Ajouter une tâche</h3>
            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre"
                    className="border p-2 rounded flex-1"
                />
                <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Description"
                    className="border p-2 rounded flex-1"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border p-2 rounded"
                />
                <select
                    value={assigned}
                    onChange={(e) => setAssigned(e.target.value as any)}
                    className="border p-2 rounded"
                >
                    <option value="">-- Assigné à --</option>
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleAdd}
                    className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
}
