import { useEffect, useState } from "react";
import { getUsers, createUser } from "../api/api";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        getUsers().then((res) => setUsers(res.data));
    }, []);

    const handleAdd = async () => {
        if (!newName.trim() || !newEmail.trim()) return;
        const res = await createUser({ name: newName, email: newEmail });
        setUsers([...users, res.data]);
        setNewName("");
        setNewEmail("");
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-2">Liste des utilisateurs</h2>
            <ul className="mb-4">
                {users.map((u) => (
                    <li key={u.id} className="border-b py-2">
                        <b>{u.name}</b> – {u.email}
                    </li>
                ))}
            </ul>

            <h3 className="font-semibold mb-2">Ajouter un utilisateur</h3>
            <div className="flex flex-col gap-2 md:flex-row">
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nom"
                    className="border p-2 rounded flex-1"
                />
                <input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 rounded flex-1"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
}
