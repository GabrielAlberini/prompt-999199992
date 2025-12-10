import { useState, useEffect } from "react";

export function Home() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || []))
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "es-AR";
      recog.continuous = true;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const rawTranscript =
          event.results[event.results.length - 1][0].transcript.trim();

        if (!rawTranscript || rawTranscript.length < 2) return;

        let transcript = rawTranscript.toLowerCase();
        transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1);

        if (!transcript.endsWith(".")) {
          transcript += ".";
        }

        addTask(transcript);
      };

      recog.onerror = (err) => {
        console.error("Error en reconocimiento:", err);
      };

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

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    if (confirm("¿Estás seguro que quieres borrar la tarea?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div>
      <h1>Administrador de Tareas</h1>

      <button onClick={startListening} disabled={listening}>
        Iniciar escucha
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Detener escucha
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.text} {task.done ? "(hecha)" : ""}
            </span>
            <button onClick={() => toggleTask(task.id)}>
              {task.done ? "Desmarcar" : "Marcar hecha"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
