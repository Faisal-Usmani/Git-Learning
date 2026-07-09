import { useState, useEffect } from "react";
import api from "../api/axios";
import TaskForm from "./TaskForm";
import { useAuth } from "../context/AuthContext";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // null = adding new task
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();

  // Fetch tasks once on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate( ) {
    const { data } = await api.post("/tasks", taskData);
    setTasks((prev) => [data, ...prev]); // prepend new task, no full refetch needed
  }

  async function handleUpdate(taskData) {
    const { data } = await api.put(`/tasks/${editingTask._id}`, taskData);
    setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    setEditingTask(null);
  }

  async function handleDelete(id) {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>My Tasks</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <TaskForm
        initialData={editingTask}
        onSubmit={editingTask ? handleUpdate : handleCreate}
        onCancel={() => setEditingTask(null)}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ borderBottom: "1px solid #ccc", padding: 8 }}>
            <strong>{task.title}</strong> — {task.status}
            <p>{task.description}</p>
            <button onClick={() => setEditingTask(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
