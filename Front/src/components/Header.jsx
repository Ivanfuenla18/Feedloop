import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-black  text-white text-center p-5 flex items-center justify-between ">
      <Link to="/">Feedloop</Link>

      <div className="flex gap-10">
        <Link to="/">Inicio</Link>
        <Link to="/login">
          <img className="h-[25px] w-[25px]" src="user_icon.png" alt="" />
        </Link>
      </div>
    </header>
  );
};
