import { getSettings } from "../API/Settings";

export const generateId=()=>{
    return Math.floor(Math.random()*10000000000000)
};

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
  console.log(settings)
  if(settings && settings.length > 0 && settings[0].defaultStartDate && settings[0].defaultEndDate){
    return [settings[0].defaultStartDate, settings[0].defaultEndDate];
  }
  return["2024-10-10","2024-11-11"];
};

export const compileMixture = ()=>{


};

export const loadCalendarStyles = function(mixtures){
 
    for(let {id,color,start_date,end_date} of mixtures){
        const elements = document.querySelectorAll('.highlight'+id);
    

    if (elements) {

     for(let el of elements){
        //console.log("20px solid "+(color ? color:"black"))
      el.style.borderBottom ="20px solid "+(color ? color:"black")
      el.style.borderRight="10px solid white"

      let timeoutId;

      const delayedFunction = () => {

          const tileEl= document.getElementById("tile")
          tileEl.innerHTML = `Start Date: ${start_date}<br>End Date: ${end_date}`;
          tileEl.style.left = el.getBoundingClientRect().left+"px";
          tileEl.style.top= (el.getBoundingClientRect().top-105)+"px";
          tileEl.style.width =el.offsetWidth+"px"
          tileEl.style.height =(el.offsetHeight+80)+"px"
          tileEl.style.display="block"
          el.style.borderBottom ="20px solid "+(color ? color:"black")
      };


      el.addEventListener("mouseover",()=>{
        clearTimeout(timeoutId);
        timeoutId = setTimeout(delayedFunction, 1000);
      })


      el.addEventListener("mouseout",()=>{
        const tileEl= document.getElementById("tile")
        tileEl.style.display="none"
        el.style.borderBottom ="20px solid "+(color ? color:"black")
        clearTimeout(timeoutId);
      })
     }
    
  };

 
    }
};
