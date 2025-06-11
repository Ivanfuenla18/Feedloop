import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate si lo vas a usar

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  // Nuevo estado para controlar el tipo de mensaje (éxito o error)
  const [esError, setEsError] = useState(false); // Inicialmente no hay error

  // Si vas a usar useNavigate, inicialízalo
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje(""); // Limpia el mensaje anterior
    setEsError(false); // Reinicia el estado de error

    try {
      const userData = {
        nombre,
        contraseña,
        correo,
      };

      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Usuario creado correctamente.`);
        setEsError(false); // Asegura que el mensaje sea verde
        setNombre("");
        setCorreo("");
        setContraseña("");
        // Opcional: Redirigir al usuario después del éxito
        // navigate('/login');
      } else {
        // Si la respuesta no fue OK (ej. 400, 409, 500)
        setMensaje(
          `Error: ${data.message || "Error desconocido al crear usuario."}`
        );
        setEsError(true); // Indica que el mensaje es un error
        console.error("Error al crear usuario:", data);
      }
    } catch (error) {
      // Manejo de errores de red
      setMensaje(`Error de red: ${error.message}`);
      setEsError(true); // Indica que el mensaje es un error
      console.error("Error en la petición fetch:", error);
    }
  };

  return (
    <section className="flex items-center justify-center mt-16 h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-auto w-80 border border-black rounded-2xl p-10 shadow-2xl"
      >
        <h1 className="text-2xl text-center mb-10">Registro de usuario</h1>

        <label>Nombre de usuario</label>
        <input
          type="text"
          className="border border-black rounded-l mb-4 p-1"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Correo</label>
        <input
          type="email"
          className="border border-black rounded-l mb-4 p-1"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          className="border border-black rounded-l mb-4 p-1"
          required
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        {/* Aquí es donde aplicamos las clases condicionalmente */}
        {mensaje && (
          <h1
            className={`${
              esError ? "text-red-500" : "text-green-500"
            } text-center`}
          >
            {mensaje}
          </h1>
        )}

        <button
          type="submit"
          className="border border-black p-0.5 rounded-xl bg-black text-white mt-10 hover:bg-white hover:text-black transition cursor-pointer"
        >
          Registrarse
        </button>

        <span className="mt-10 text-center">
          Tienes usuario{" "}
          <Link to="/login" className="text-blue-500">
            inicia sesión
          </Link>
        </span>
      </form>
    </section>
  );
};
