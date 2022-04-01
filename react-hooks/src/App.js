import "./App.css";
import { useState } from "react";

import { Header } from "./components/Header";
import { Characters } from "./components/Characters";
import { ThemeContext } from "./context/ThemeContext";





function App() {
  const [darkmode, setDarkmode] = useState(false);
  // return (
  //   <div className="App"  style={{
  //     backgroundColor:
  //     darkmode ?"#fff": "#000",
  //   }}>
  //     <button type="button" onClick={() => setDarkmode(!darkmode)}>
  //       {darkmode ? "Dark Mode" : "Light Mode"}
  //     </button>
  //     <Header />
    
  //     <Characters/>
  //     <h1>Soy Raycris el mejor de react</h1>
  //   </div>
  // );
  return (
    <ThemeContext.Provider value={{darkmode, setDarkmode}}>
      <div className={darkmode? "Dark": "Light"}>
      <h1>Soy Raycris el mejor de react</h1>
        <Header/>
        <Characters/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
