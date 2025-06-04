import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <section className="flex items-center justify-center mt-16 h-[80vh]">
      <form
        action=""
        className="flex flex-col  h-96 w-80 border border-black  rounded-2xl p-10 shadow-2xl "
      >
        <h1 className="text-2xl text-center mb-10">Inicio de sesion</h1>
        <label htmlFor="" />
        Correo
        <input type="email" className="border border-black rounded-l" />
        <label htmlFor="" />
        Contraseña
        <input type="password" className="border border-black  rounded-l" />
        <button className=" border border-black rounded-xl p-0.5 bg-black text-white mt-10 hover:bg-white hover:text-black transition cursor-pointer">
          Iniciar
        </button>
        <span className="mt-10 text-center">
          No tienes usuario{" "}
          <Link to="/register" className="text-blue-500 ">
            registrate
          </Link>
        </span>
      </form>
    </section>
  );
};
