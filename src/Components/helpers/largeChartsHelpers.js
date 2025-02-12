import moment from "moment";

export const generateDataSeries = (
  data,
  start_date,
  end_date,
  mode,
  domain = "ALL" 
) => {
  switch (domain) {
    case "ALL":
      return generateDataSeries_ALL(data, start_date, end_date, mode);
    // Domain is developmental for now
    default:
      break;
  }
};

function generateDataSeries_ALL(data, start_date, end_date, mode) {

  const START_DATE = moment(start_date)
  const END_DATE = moment(end_date)
  const DATASERIES = [];
  let iterations = END_DATE.diff(START_DATE, 'days') + 1; //Number of days between start and end
  //console.log(iterations)
  switch (mode) {
  case '1':
    for (let i = 0; i <= iterations; i++){
      let current_date = moment(start_date).add(i, 'days');
      if (data.some(item => moment(item.TimeOfSz, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') === current_date.format('YYYY-MM-DD'))) {
        getAverageLengthPerDay(current_date,data,DATASERIES);
      }else{
        DATASERIES.push([Date.parse(moment(current_date._d).format("YYYY-MM-DD")),0])
      }
    }
    return DATASERIES;
  case '2':
    for (let i=0; i<=iterations; i++){
      let current_date = moment(start_date).add(i, 'days');
      if (data.some(item => moment(item.TimeOfSz, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') === current_date.format('YYYY-MM-DD'))) {
        
        getNumberPerDay(current_date,data,DATASERIES);
      }else{
        DATASERIES.push([Date.parse(moment(current_date._d).format("YYYY-MM-DD")),0])
      }
    }

    return DATASERIES;
  default:
    break;
  }
}

export function generateDataSeries_MIXTURE(mixtures, start_date, end_date){
  const START_DATE = moment(start_date);
  const END_DATE = moment(end_date);
  const DATASERIES = [];


  mixtures.forEach((mixture) => {
    const startMixture = moment(mixture.start_date, "YYYY-MM-DD");
    const endMixture = moment(mixture.end_date, "YYYY-MM-DD");

    // Truncate mixture dates to fit within param date boundaries
    const effectiveStart = moment.max(START_DATE, startMixture);
    const effectiveEnd = moment.min(END_DATE, endMixture);

    // Generate daily points if the mixture's effective range is valid
    if (effectiveStart.isSameOrBefore(effectiveEnd)) {
      const days = effectiveEnd.diff(effectiveStart, "days") + 1;

      for (let i = 0; i < days; i++) {
        const currentDate = effectiveStart.clone().add(i, "days");
        //console.log(mixture)
        DATASERIES.push({
          x: Date.parse(currentDate.format("YYYY-MM-DD")), // Timestamp for Highcharts
          y: 10, // Fixed value for visualization (e.g., 1 for presence)
          name: Date.parse(currentDate.format("YYYY-MM-DD")),
           // Color from mixture data
        });
      }
    }
  });

  return DATASERIES;
}








function getAverageLengthPerDay(current_date, data, DATASERIES) {
  let totalLength = 0;
  let count = 0;

  for (let record of data) {
    const recordDate = moment(record.TimeOfSz, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
    if (recordDate === current_date.format('YYYY-MM-DD')) {
      totalLength += record.LengthOfSz;
      count++;
    }
  }
  let average = (totalLength / count).toFixed(2); // OLD JS ROUNDING
  DATASERIES.push([Date.parse(moment(current_date._d).format("YYYY-MM-DD")),parseInt(average)])
}

function getNumberPerDay(current_date, data, DATASERIES) {
  let count =0;

  for (let record of data) {
    const recordDate = moment(record.TimeOfSz, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
    if (recordDate === current_date.format('YYYY-MM-DD')) {
      count++;
    }
  }

  DATASERIES.push([Date.parse(moment(current_date._d).format("YYYY-MM-DD")), count]);

}

export const generateTitle = (params) => {
  
  return `${getMonthFromNumber(parseInt(params.start_date.split("-")[1]))} ${
    params.start_date.split("-")[0]
  } to 
    ${getMonthFromNumber(parseInt(params.end_date.split("-")[1]))} ${
    (params.end_date).split("-")[0]
  }`;
};

export const getMonthFromNumber = (number) => {
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

  if (number >= 1 && number <= 12) {
    return months[number - 1];
  } else {
    return "Invalid month number";
  }
};
