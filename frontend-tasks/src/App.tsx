import './App.css'
import ProjectList from "./components/ProjectList.tsx";
import UserList from "./components/UserList.tsx";
import {useState} from "react";
import TaskList from "./components/TaskList.tsx";

function App() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Gestion de tâches collaboratives</h1>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <ProjectList onSelect={(id) => setSelectedProject(id)} />
                    {selectedProject && <TaskList projectId={selectedProject} />}
                </div>
                <UserList />
            </div>
        </div>
    );
}

export default App
