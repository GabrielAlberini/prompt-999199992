
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate("/mis-tareas")
    localStorage.setItem("user", "conectado")
  }

  return (
    <div>
      <h2>{isLogin ? "Login" : "Registro"}</h2>
      <form>
        {!isLogin && (
          <div>
            <label>Nombre de usuario</label>
            <input type="text" placeholder="Ingresa tu nombre" />
          </div>
        )}
        <div>
          <label>Email</label>
          <input type="email" placeholder="Ingresa tu email" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" placeholder="Ingresa tu contraseña" />
        </div>
        <button onClick={handleLogin} type="submit">{isLogin ? "Ingresar" : "Registrarse"}</button>
      </form>
      <button>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
}