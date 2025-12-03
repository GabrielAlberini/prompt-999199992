import { Link, useNavigate } from "react-router-dom";

export function Layout({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")

  const handleLogout = () => {
    // Aquí luego se integrará la lógica real de logout
    localStorage.setItem("user", "desconectado")
    console.log("Sesión cerrada");
    navigate("/");
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/tutorial">¿Cómo se usa?</Link>
          {
            user === "conectado" && <>
              <Link to="/mis-tareas">Mis tareas</Link>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
                Cerrar sesión
              </button>
            </>
          }
          {
            user === "desconectado" && <Link to="/">Iniciar sesión</Link>
          }
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2025 Administrador de Tareas por Voz</p>
      </footer>
    </div>
  );
}
