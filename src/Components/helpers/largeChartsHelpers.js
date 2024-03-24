/*


*/

export const generateDataSeries = (
  data,
  start_date,
  mode = GRAPH_MODE.AVERAGE_PER_DAY,
  domain = "YEAR"
) => {
  if (domain === "YEAR") {
    return generateDataSeries_YEAR(data,start_date, mode);
  } else if (domain === "MONTH") {
    return generateDataSeries_MONTH(data,start_date, mode);
  }
};

/*


*/

function generateDataSeries_YEAR(data,start_date, mode = GRAPH_MODE.AVERAGE_PER_DAY) {
  const startDate = new Date(start_date);
  startDate.setDate(startDate.getDate() + 1);
  const dataSeries = [];

  for (let i = 0; i < 365; i++) {
    // LEAP YEARS ALSO EXIST

    const date = new Date(startDate);

    date.setDate(startDate.getDate() + i);

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
   date.setMilliseconds(0);

    let dateSe = data.filter((item) => {
      const szDate = new Date(item.TimeOfSz);
      szDate.setHours(0);
      szDate.setMinutes(0);
      szDate.setSeconds(0);
      szDate.setMilliseconds(0);
      return szDate.getTime() === date.getTime();
    })

   let value = 0;
    if (mode === GRAPH_MODE.AVERAGE_PER_DAY) {
      for (let el of dateSe) {
        value += el.LengthOfSz;
      }
      if (dateSe.length > 0) {
        value = value / dateSe.length;
      }
    } else if (mode === GRAPH_MODE.FREQ_PER_DAY) {
      value = dateSe.length;
    }
    
    
    //dataSeries.push([date.getTime() /*- date.getTime()%(24*60*60*1000) *//*remove any remaining hours*/, value]); // Replace Math.random() with your actual data value
    
    for(let el of dateSe){
      let date=new Date(el.TimeOfSz);
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      dataSeries.push([date.getTime() - date.getTime()%(24*60*60*1000), value]);
    }
    console.log(dataSeries)
  
  }
  

  return dataSeries;
}

/*


*/

function generateDataSeries_MONTH(data,start_date, mode = GRAPH_MODE.AVERAGE_PER_DAY) {
    const startDate = new Date(start_date);
    startDate.setDate(startDate.getDate() + 1);
    const dataSeries = [];

  /*  function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
  return new Date(year, month, 0).getDate();} */

  
    for (let i = 0; i < 31; i++) { // Depends on the month (28 - 31)
    
  
      const date = new Date(startDate);
  
      date.setDate(startDate.getDate() + i);
  
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
  
      let dateSe = data.filter((item) => {
        const szDate = new Date(item.TimeOfSz);
        szDate.setHours(0);
        szDate.setMinutes(0);
        szDate.setSeconds(0);
        szDate.setMilliseconds(0);
        return szDate.getTime() === date.getTime();
      });
  
      let value = 0;
      if (mode === GRAPH_MODE.AVERAGE_PER_DAY) {
        for (let el of dateSe) {
          value += el.LengthOfSz;
        }
        if (dateSe.length > 0) {
          value = value / dateSe.length;
        }
      } else if (mode === GRAPH_MODE.FREQ_PER_DAY) {
        value = dateSe.length;
      }
      dataSeries.push([date.getTime()+1000*60*60*25123, value]); 
    }
  
    return dataSeries;


  
}

/*


*/

export const generateTitle = (params) => {
  return `${getMonthFromNumber(params.startdate)} ${
    params.startdate.split("-")[0]
  } to 
    ${getMonthFromNumber(calculateEnddate(params.startdate, params.domain))} ${
    calculateEnddate(params.startdate, params.domain).split("-")[0]
  }`;
};

/*


*/

export const GRAPH_MODE = {
  AVERAGE_PER_DAY: 1, /// Average Length per day
  FREQ_PER_DAY: 2, /// Number of seizures per day
};

/*


*/

export const getMonthFromNumber = (number) => {
  const integerValue = Number(number.split("-")[1]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (integerValue >= 1 && integerValue <= 12) {
    return months[integerValue - 1];
  } else {
    return "Invalid month number";
  }
};

/*


*/

export const calculateEnddate = (startdate, domain) => {
  startdate = startdate.split("-");
  if (domain === "YEAR") {
    startdate[0] = Number(startdate[0]) + 1;
    return startdate.join("-");
  }

  if (domain === "MONTH") {
    if (Number(startdate[1]) !== 12) {
      startdate[1] = Number(startdate[1]) + 1;
      return startdate.join("-");
    } else {
      startdate[0] = Number(startdate[0]) + 1;
      startdate[1] = Number(startdate[1]) - 11;
      console.log(startdate);
      return startdate.join("-");
    }
  }
};
