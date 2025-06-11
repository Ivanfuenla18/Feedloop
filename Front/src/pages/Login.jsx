import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  const navigate = useNavigate();

  // Comprobación para redirigir si el usuario YA está logueado
  useEffect(() => {
    const token = localStorage.getItem("token"); // Es mejor comprobar el token que el user data directamente
    // También podrías verificar 'localStorage.getItem("user")' si lo prefieres, pero el token es la fuente de verdad.
    if (token) {
      // Si hay un token, significa que el usuario ya está logueado
      // Redirige al dashboard para evitar que el usuario se quede en la página de login si ya inició sesión
      navigate("/dashboard");
    }
    // No necesitamos un 'else { navigate("/login"); }' aquí, porque ya estamos en la página de login.
  }, [navigate]); // Dependencia: el efecto se vuelve a ejecutar si 'navigate' cambia.

  // --- El resto de tu función handleSubmit y el JSX son correctos ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setEsError(false);

    try {
      const loginData = {
        correo,
        contraseña,
      };

      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(
          `Inicio de sesión exitoso. ¡Bienvenido, ${data.user.nombre}!`
        );
        setEsError(false);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard"); // Redirige al dashboard después del login exitoso
      } else {
        setMensaje(
          `Error: ${
            data.message || "Credenciales inválidas o error desconocido."
          }`
        );
        setEsError(true);
        console.error("Error al iniciar sesión:", data);
      }
    } catch (error) {
      setMensaje(
        `Error de red: ${
          error.message || "No se pudo conectar con el servidor."
        }`
      );
      setEsError(true);
      console.error("Error en la petición fetch:", error);
    }
  };

  return (
    <section className="flex items-center justify-center mt-16 h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-auto w-80 border border-black rounded-2xl p-10 shadow-2xl"
      >
        <h1 className="text-2xl text-center mb-10">Inicio de sesión</h1>

        <label className="mb-1">Correo</label>
        <input
          type="email"
          className="border border-black rounded-l mb-4 p-1"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label className="mb-1">Contraseña</label>
        <input
          type="password"
          className="border border-black rounded-l mb-4 p-1"
          required
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        {mensaje && (
          <p
            className={`${
              esError ? "text-red-500" : "text-green-500"
            } text-center mt-4`}
          >
            {mensaje}
          </p>
        )}

        <button
          type="submit"
          className="border border-black rounded-xl p-0.5 bg-black text-white mt-10 hover:bg-white hover:text-black transition cursor-pointer"
        >
          Iniciar
        </button>

        <span className="mt-10 text-center">
          ¿No tienes usuario?{" "}
          <Link to="/register" className="text-blue-500 ">
            Regístrate aquí
          </Link>
        </span>
      </form>
    </section>
  );
};
