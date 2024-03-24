import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getGraphData } from "../API/Graph.js";
import { useEffect, useState } from "react";
import Chartform from "./Chartform.jsx";

import { GRAPH_MODE } from "./helpers/largeChartsHelpers.js";
import {
  generateDataSeries,
  generateTitle,
} from "./helpers/largeChartsHelpers.js";


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
    events: {
     /* afterSetExtremes: function(e) {

      if((e.max-e.min)/(60*60*1000*24*360)>0.9){
        //alert("Zoom out")
        ///setState()
      }
        
      }*/
  },
    type: "datetime",
    /* dateTimeLabelFormats: {
      month: "%b", // Display abbreviated month names
    } ,
    tickInterval: 30 * 24 * 3600 * 1000, // One month in milliseconds */
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
    startdate: "2024-01-01",
    domain: "YEAR",
    mode: GRAPH_MODE.AVERAGE_PER_DAY,
  });

  useEffect(() => {
    loadGraphData();
  }, [params,]);

  const loadGraphData = async () => {
    try {
      let data = await getGraphData(params);
      if (data === undefined || data.length === 0) data = [0];

      setOptions({
      ...defaultOptions,  /// is the default options good?
      title: {
        // Start date TO end date
        text: generateTitle(params),
        align: 'left'
       },
        series: [{            ///why series is an array? can we draw Yearly series and Month series within the array?
            type: 'area',
            name: params.mode === '1' ? 'Average Length of Seizure' : 'Number of Seizures',
            data: generateDataSeries(
              data,
              params.startdate,
              params ? params.mode : 1,
              params.domain
            ),
          },
                {
            type: 'line',
            name: 'Highlighted Range',
            data: [
                  {
                    x: Date.UTC(2024, 2, 10), // 2024-02-10
                    y: 0, // Adjust the y-value as needed
                  },
                  {
                    x: Date.UTC(2024, 3, 28), // 2024-02-28
                    y: 0, // Adjust the y-value as needed
                  },
                ],
            color: 'red', // Customize the line color
            lineWidth: 2, // Customize the line width
          },
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

/*
Highcharts.addEvent(Highcharts.Point, 'click', function () {
    
  alert("click")

});*/