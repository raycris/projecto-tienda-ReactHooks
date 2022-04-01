import { useState, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

const Header = () => {

  const {darkmode, setDarkmode} = useContext(ThemeContext);
    const handleClick = () => {
      setDarkmode(!darkmode);
    }
  return (
    <div className="Header">
      <h1 >ReactHooks</h1>
      <button type="button" onClick={handleClick}>
        {darkmode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export { Header };
