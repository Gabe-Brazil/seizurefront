import { getSettings } from "../API/Settings";

export const generateId=()=>{
    return Math.floor(Math.random()*10000000000000)
};

const offsetMinutes = new Date().getTimezoneOffset();
//const offsetHours = Math.floor(offsetMinutes / 60);
export const compileRecord = ({duration,durationseconds,hours,mins, dayTime, type, date, features, fromPanic})=>{
let result = {};

if(dayTime==="PM" && hours!== '12'){ //Converts PM into 24 hour time
hours= parseInt(hours)+12    
}
if(dayTime==="AM" && hours === '12'){
hours = 0;    
}

result.TimeOfSz= date + " " + hours + ":" + mins + ":00";
result.TypeOfSz= type;
result.LengthOfSz= duration*60+durationseconds*1; //Length of Sz now in seconds
result.FeaturesOfSz= features;
result.fromPanic= fromPanic;
result.offsetMinutes=offsetMinutes; //make part of database in the future
return result
};

export const decompileRecord=({FeaturesOfSz,LengthOfSz,TimeOfSz,TypeOfSz,Id})=>{

TimeOfSz=TimeOfSz.split(" ")

let date=TimeOfSz[0]
let time=TimeOfSz[1].split(":")
let hours = time[0]
let mins = time[1]
let dayTime=getAMPM(hours)
let duration=Math.floor(LengthOfSz/60) 
let durationseconds= (1*LengthOfSz-duration*60);
let features=FeaturesOfSz
let type=TypeOfSz


return {
  date,
  hours,
  mins,
  dayTime,
  duration,
  durationseconds,
  features,
  type,
  Id
  }

};

export const getAMPM = (hour) => {
  let hours = parseInt(hour);

  return hours >= 12 ? 'PM' : 'AM';
};

export const getDates = async () => {
  let settings = await getSettings();
  if(settings && settings.length > 0 && settings[0].defaultStartDate && settings[0].defaultEndDate){
    return [settings[0].defaultStartDate, settings[0].defaultEndDate];
  }
  return["2024-01-01","2024-12-31"];
};

export const compileMixture = ()=>{


};

export const loadCalendarStyles = function (mixtures) {
  for (let { ID, color, start_date, end_date, components } of mixtures) {
    const elements = document.querySelectorAll(".highlight" + ID);

    if (elements.length === 0) continue; // Skip if no elements found

    console.log(mixtures);

    let medicationNames = components.map((c) => c.MedicationName).join(", ");
    console.log(medicationNames);

    elements.forEach((el) => {
      el.style.borderBottom = `4px solid ${color || "black"}`; // Standard border size
      el.style.borderRight = "2px solid white";

      let timeoutId;

      const showTooltip = () => {
        const tileEl = document.getElementById("tile");
        if (!tileEl) return;

        const rect = el.getBoundingClientRect();
        tileEl.innerHTML = `${medicationNames} <br>Start Date: ${start_date}<br>End Date: ${end_date}`;
        tileEl.style.left = `${rect.left}px`;
        tileEl.style.top = `${rect.top - 40}px`; // Adjusted for better positioning
        tileEl.style.width = `${el.offsetWidth}px`;
        tileEl.style.display = "block";
      };

      const hideTooltip = () => {
        const tileEl = document.getElementById("tile");
        if (!tileEl) return;
        tileEl.style.display = "none";
        clearTimeout(timeoutId);
      };

      el.addEventListener("mouseover", () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(showTooltip, 500); // Slightly faster response
      });

      el.addEventListener("mouseout", hideTooltip);
    });
  }
};
