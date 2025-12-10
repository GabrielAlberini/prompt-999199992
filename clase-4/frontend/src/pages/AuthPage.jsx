import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "conectado");
    navigate("/mis-tareas");
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isLogin ? "Login" : "Registro"}</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input id="username" type="text" placeholder="Ingresa tu nombre" />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Ingresa tu email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <button type="submit" className="btn btn-primary submit">
          {isLogin ? "Ingresar" : "Registrarse"}
        </button>
      </form>
      <button
        className="btn btn-secondary toggle-btn"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
}
