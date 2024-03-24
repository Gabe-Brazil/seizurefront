import React, { useState } from "react";
import "./Panicbutton.css";

function Panicbutton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const buttonClassName = isClicked ? "-click" : "";

  return (
    <div className="buttonIcon">
      <h1>Panic Button</h1>
      <div
        className="buttonAnimation"
        id="button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div id="top" className={"top" + buttonClassName}></div>
        <div id="bottom"></div>
        <div id="bodybutton" className={"bodybutton" + buttonClassName}></div>
        <div id="floor"></div>
      </div>
    </div>
  );
}

export default Panicbutton;
