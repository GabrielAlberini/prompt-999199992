import { Link, useNavigate } from "react-router-dom";

export function Layout({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.setItem("user", "desconectado");
    navigate("/");
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/tutorial" className="nav-link">¿Cómo se usa?</Link>
          {user === "conectado" && (
            <>
              <Link to="/mis-tareas" className="nav-link">Mis tareas</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </>
          )}
          {user === "desconectado" && (
            <Link to="/" className="nav-link">Iniciar sesión</Link>
          )}
        </nav>
        {
          user === "conectado" && <button onClick={handleLogout} className="btn btn-secondary">
            Cerrar sesión
          </button>
        }
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <p>© 2025 SpeetchApp – Administrador de Tareas por Voz</p>
      </footer>
    </div>
  );
}
