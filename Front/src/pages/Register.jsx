import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="flex items-center justify-center mt-16 h-[80vh]">
      <form
        action=""
        className="flex flex-col  h-auto w-80 border border-black  rounded-2xl p-10 shadow-2xl "
      >
        <h1 className="text-2xl text-center mb-10">Registro de usuario </h1>
        <label htmlFor="" />
        Nombre de usuario
        <input type="text" className="border border-black rounded-l" />
        <label htmlFor="" />
        Correo
        <input type="email" className="border border-black rounded-l" />
        <label htmlFor="" />
        Contraseña
        <input type="password" className="border border-black  rounded-l" />
        <button className=" border border-black p-0.5 rounded-xl bg-black text-white mt-10 hover:bg-white hover:text-black transition cursor-pointer">
          Registrarse
        </button>
        <span className="mt-10 text-center">
          Tienes usuario{" "}
          <Link to="/login" className="text-blue-500 ">
            inicia sesion
          </Link>
        </span>
      </form>
    </section>
  );
};
