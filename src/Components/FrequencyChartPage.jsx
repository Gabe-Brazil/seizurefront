import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Form from 'react-bootstrap/Form';

import { Bar } from 'react-chartjs-2';
import { getGraphData } from '../API/Graph.js'
import { useEffect, useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,

  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map(item=>{
  return [item+ "_w1",item+"_w2",item+"_w3",item+"_w4"]
}).flat()


export default function FrequencyChartPage() {
  
  const [data,setData]=useState([]);
  const [data_graph,setDataGraph]=useState(null)
  const [params,setParams]=useState({
    startdate:"2019-01-01",
    domain:"YEAR"
});

  
  useEffect(()=>{

    loadGraphData();
   
    },[params])
  
  
    const loadGraphData = async () => {
      try {
        let data = await getGraphData(params);
        let labels=data.map(item=>item.TimeOfSz)
        data=data.map(item=>item.LengthOfSz)
        
       
        setDataGraph(
          {
            labels,
            datasets: [
              {
                label: 'Dataset Red',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
              },
              
            ],
          }
        )
      } catch (error) {
        console.error("Error loading records:", error);
      }
  }

  return (
<div style={{border:"2px solid black", height:"90%", overflowX:"hidden"}}>
   <Form  style={{width:"300px"}}>
      <Form.Label> Start Date </Form.Label>
      <Form.Control name="date"
        value={params.startdate} type="date"
        onChange={(e)=>{
        setParams({
           ...params,
           startdate:e.target.value
          })
        }}
      />

      <Form.Label> Domain </Form.Label>
        <Form.Select  onChange={(e)=>{
           setParams({
               ...params,
               domain:e.target.value
             })
            }}   aria-label="Default select example" name="domain">
            <option value="YEAR">Year</option>
             <option value="MONTH">Month</option>
        </Form.Select>
 
    </Form>
    
    

    
  
  
  
  
  <div className="graph-container" style={{height:"80%",overflowX:"scroll",padding:"30px"}}>
    <div style={{width:"50000px",height:"100%",display:"flex"}} >
       {data_graph &&<Bar options={options} data={data_graph} style={{border:"2px solid black" ,height:"100%"}} />}
       {data_graph &&<Bar options={options} data={data_graph} style={{border:"2px solid black" ,height:"100%"}} />}
    </div>

 
</div>
  

</div>
);
}

// Time of Seizure
// Length of Seizure
// 