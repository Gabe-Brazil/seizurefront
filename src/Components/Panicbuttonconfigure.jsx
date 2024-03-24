import React, { useState } from "react";
import "./Panicbuttonconfigure.css";
function Panicbuttonconfigure(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div className="panicButton">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <button className={`accordion ${isOpen ? "" : "is-open"}`} onClick={toggleAccordion}> Configure </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`} style={{ maxHeight: isOpen ? null : "800px" }}>
      
      Content

        
  
      </div>
    </div>
  );
}

export default Panicbuttonconfigure;
