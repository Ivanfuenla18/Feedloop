import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Intentar obtener los datos del usuario del localStorage al cargar el componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserName(user.nombre || "Usuario"); // Muestra el nombre o un genérico
      } catch (e) {
        console.error("Error al parsear datos de usuario del localStorage:", e);
        setUserName("Usuario");
      }
    } else {
      // Si no hay datos de usuario (o token), redirigir al login
      // Esto es una medida de seguridad básica, idealmente se validaría el token con el backend
      navigate("/login");
    }
  }, [navigate]); // El efecto se ejecuta cuando 'navigate' cambia (que no debería cambiar)

  const handleLogout = () => {
    // Eliminar el token y los datos del usuario del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirigir al usuario a la página de login
    navigate("/login");
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] mt-16 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          ¡Bienvenido, {userName}!
        </h1>
        <p className="text-gray-600 mb-8">
          Estás en el dashboard de tu aplicación Feedloop. Aquí podrás ver tu
          información personal o acceder a otras funcionalidades.
        </p>

        {/* Un botón de ejemplo para alguna acción */}
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
          onClick={() => alert("¡Funcionalidad en desarrollo!")}
        >
          Ver mi perfil
        </button>

        {/* Botón de Cerrar Sesión */}
        <button
          className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Puedes añadir más contenido aquí si lo deseas */}
      <div className="mt-8 text-gray-500 text-sm">
        <p>Dashboard de ejemplo para la aplicación Feedloop.</p>
        <p>Ubicación: Fuenlabrada, Comunidad de Madrid, España.</p>
      </div>
    </section>
  );
};
