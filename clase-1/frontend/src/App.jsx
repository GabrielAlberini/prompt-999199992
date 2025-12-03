import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Tareas</h1>

      {tasks.length === 0 && <p>Cargando tareas...</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <strong>{task.content}</strong> <br />
            <span>ID: {task.id}</span> <br />
            <span>ID User: {task.idUser}</span> <br />
            <span>Fecha: {new Date(task.timestamp).toLocaleString()}</span> <br />
            <span>Completada: {task.completed ? "Sí" : "No"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
