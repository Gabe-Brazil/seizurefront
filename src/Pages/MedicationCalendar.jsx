import React from "react";
import { getDetails } from "../API/Auth";
import { useEffect, useState } from "react";
import CalendarComponent from '../Components/Calendar';


function MedicationCalendar() {
  

  return (
    <div>
      <CalendarComponent></CalendarComponent>
    </div>
  );
}

export default MedicationCalendar;

