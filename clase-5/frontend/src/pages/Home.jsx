import { useState, useEffect } from "react";
import { Mic, Square, CheckCircle, XCircle, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:1111/tasks";
const HARDCODED_USER_ID = "507f1f77bcf86cd799439011";

export function Home() {
  const [tasks, setTasks] = useState([]);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const fetchingTasks = async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchingTasks();
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "es-AR";
      recog.continuous = true;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const rawTranscript = event.results[event.results.length - 1][0].transcript.trim();
        if (!rawTranscript || rawTranscript.length < 2) return;

        let transcript = rawTranscript.toLowerCase();
        transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
        if (!transcript.endsWith(".")) transcript += ".";

        addTask(transcript);
      };

      recog.onerror = (err) => console.error("Error en reconocimiento:", err);
      setRecognition(recog);
    } else {
      console.error("SpeechRecognition no soportado en este navegador.");
    }
  }, []);

  const startListening = () => {
    if (recognition && !listening) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && listening) {
      recognition.stop();
      setListening(false);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          userId: HARDCODED_USER_ID,
        }),
      });
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const toggleTask = async (id, currentDone) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: !currentDone,
        }),
      });
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    if (confirm("¿Estás seguro que quieres borrar la tarea?")) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
      }
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Administrador de Tareas</h1>

      <div className="controls">
        <button onClick={startListening} disabled={listening} className="btn btn-primary">
          <Mic size={18} />
        </button>
        <button onClick={stopListening} disabled={!listening} className="btn btn-secondary">
          <Square size={18} />
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span className={task.done ? "task-text done" : "task-text"}>
              {task.text}
            </span>
            <div className="task-actions">
              <button onClick={() => toggleTask(task._id, task.done)} className="btn btn-accent">
                {task.done ? <XCircle size={18} /> : <CheckCircle size={18} />}
              </button>
              <button onClick={() => deleteTask(task._id)} className="btn btn-danger">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
