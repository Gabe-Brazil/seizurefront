import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getGraphData } from "../API/Graph.js";
import { useEffect, useState } from "react";
import Chartform from "./Chartform.jsx";
import { getDates } from "../utils/functions.js";
import { generateDataSeries,generateTitle,} from "./helpers/largeChartsHelpers.js";


const defaultOptions={
  chart: {
    zoomType: 'x'
  }

  ,
  subtitle: {
    text: document.ontouchstart === undefined ?
        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
        align: 'left'
  },
  xAxis: {
    type: "datetime",
  },
  yAxis: {
    title: {
      text: "Value",
    },
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    area: {
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        marker: {
            radius: 1
        },
        lineWidth: 1,
        states: {
            hover: {
                lineWidth: 1.5
            }
        },
        threshold: null
    }
  },
}

const styles={
   border: "2px solid black", height: "9 0%" 
}
// https://www.highcharts.com/demo/highcharts/line-time-series


function LargeChart() {
  

  const [options, setOptions] = useState(null);
  const [params, setParams] = useState({
    start_date: "",
    end_date: "",
    mode: '1',
  });

  const loadDefaultDates=async()=>{
    let array=await getDates();
    
    setParams({...params,start_date:array[0],end_date:array[1]})
  }
  useEffect(()=>{
   loadDefaultDates();
  },[])

  useEffect(() => {

    loadGraphData();
  }, [params,]);

  const loadGraphData = async () => {
    try {
      let data = await getGraphData(params);
      if (data === undefined || data.length === 0) data = [0];

              setOptions({
              ...defaultOptions,  
              title: {
                // Start date TO end date
                text: generateTitle(params),
                align: 'left'
              },
                series: [
                  {
                    type: 'area',
                    name: params.mode === '1' ? 'Average Length of Seizure per Day' : 'Number of Seizures per Day',
                    data: generateDataSeries(
                      data,
                      params.start_date,
                      params.end_date,
                      params.mode,
                     
                    ),
                  },
                  /*
                  {
                    type: 'line',
                    name: 'Highlighted Range',
                    data: [
                          {
                            x: Date.UTC(2024, 2, 10), 
                            y: 0,
                          },
                          {
                            x: Date.UTC(2024, 6, 22), 
                            y: 0, 
                          },
                        ],
                    color: 'red', 
                    lineWidth: 2, 
                  },*/
                ],
              });
    } catch (error) {
      console.error("Error loading records:", error);
    }
  };

  return (
    <div style={styles}>
      {options && <HighchartsReact highcharts={Highcharts} options={options} />}
      <Chartform params={params} setParams={setParams} />
     
    </div>
  );
}

export default LargeChart;