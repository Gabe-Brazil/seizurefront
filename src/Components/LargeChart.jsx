import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getGraphData } from "../API/Graph";
import { useEffect, useState } from "react";
import Chartform from "./Chartform.jsx";
import { getDates } from "../utils/functions";
import {
  generateDataSeries,
  generateTitle,
  generateDataSeries_MIXTURE,
} from "./helpers/largeChartsHelpers.js";
import { getMixturesWithComponents } from "../API/Mixture";

const defaultOptions = {
  chart: {
    zoomType: "x",
  },

  subtitle: {
    text:
      document.ontouchstart === undefined
        ? "Click and drag in the plot area to zoom in"
        : "Pinch the chart to zoom in",
    align: "left",
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
    enabled: false,
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [
            1,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0)
              .get("rgba"),
          ],
        ],
      },
      marker: {
        radius: 1,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1.5,
        },
      },
      threshold: null,
    },
  },
};

const styles = {
  border: "2px solid black",
  height: "9 0%",
};
// https://www.highcharts.com/demo/highcharts/line-time-series

function LargeChart() {
  const [options, setOptions] = useState(null);
  const [params, setParams] = useState({
    start_date: "",
    end_date: "",
    mode: "1",
  });

  const loadDefaultDates = async () => {
    let array = await getDates();

    setParams({ ...params, start_date: array[0], end_date: array[1] });
  };
  useEffect(() => {
    loadDefaultDates();
  }, []);

  useEffect(() => {
    loadGraphData();
  }, [params]);

  const loadGraphData = async () => {
    try {
      let data = await getGraphData(params);
      let mixtures = await getMixturesWithComponents();
      mixtures = mixtures.mixturesWithComponents;
      
      
      if (data === undefined || data.length === 0) data = [0];

      const series = [
        // initial series ONLY with seizure graph
        {
          type: "area",
          name:
            params.mode === "1"
              ? "Average Length of Seizure per Day"
              : "Number of Seizures per Day",
          data: generateDataSeries(
            data,
            params.start_date,
            params.end_date,
            params.mode
          ),
        },
      ];

      // Add line series for each mixture
      mixtures.forEach((mixture) => {
        const mixtureData = generateDataSeries_MIXTURE(
          [mixture], // Process each mixture individually
          params.start_date,
          params.end_date
        );
        series.push({
          type: "line", // Render as line (dots + connecting lines)
          name: `<b>Plan:</b> ${mixture.components[0].MedicationName}${mixture.components.length > 1 ? ` + ${mixture.components.length-1} more` : ""}`, // Use mixture ID or another unique field as the name
          data: mixtureData,
          color: mixture.color, // Assign the mixture's color
          lineWidth: 2,
          marker: {
            enabled: true,
            radius: 5,
            symbol: 'square',
          },
          description: "sigma"
          
        });
      });

      setOptions({
        ...defaultOptions,
        title: {
          // Start date TO end date
          text: generateTitle(params),
          align: "left",
        },
        
        
        series,
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
