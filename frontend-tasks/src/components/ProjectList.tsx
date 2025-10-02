import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/api";

interface Project {
    id: number;
    name: string;
    description: string;
}

interface Props {
    onSelect: (id: number) => void; // callback pour sélectionner un projet
}

export default function ProjectList({ onSelect }: Props) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");

    useEffect(() => {
        getProjects().then((res) => setProjects(res.data));
    }, []);

    const handleAdd = async () => {
        if (!newName.trim()) return;
        const res = await createProject({ name: newName, description: newDesc });
        setProjects([...projects, res.data]);
        setNewName("");
        setNewDesc("");
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">Liste des projets</h2>
            <ul className="mb-4">
                {projects.map((p) => (
                    <li
                        key={p.id}
                        onClick={() => onSelect(p.id)}
                        className="border-b py-2 cursor-pointer hover:bg-gray-100"
                    >
                        <b>{p.name}</b> – {p.description}
                    </li>
                ))}
            </ul>

            <h3 className="font-semibold mb-2">Ajouter un projet</h3>
            <div className="flex flex-col gap-2 md:flex-row">
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nom"
                    className="border p-2 rounded flex-1"
                />
                <input
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Description"
                    className="border p-2 rounded flex-1"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
}
