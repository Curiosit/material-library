
"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  import { Bar } from 'react-chartjs-2';
import { EPDProps } from '@/types';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  
  
  
  
  

const BarChart = (props: {material: EPDProps}) => {
  /* const datas = {
    'A1A3' : Number(props.material.A1A3),
    'C3' : Number(props.material.C3),
    'C4' : Number(props.material.C4),
    'D' : Number(props.material.D)
  } */

  console.log(props.material)
  const labels = ['A1A3', 'C3', 'C4', 'D'];
  const datas = [
    Number(props.material.A1A3),
    Number(props.material.C3),
    Number(props.material.C4),
    Number(props.material.D)
  ]
  console.log(datas)
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
      datalabels: { // This code is used to display data values
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
            weight: 'bold',
            size: 16
        }
    }
    },
    
            
        
  };
  console.log(labels.map(() => datas))
  const data = {
    labels,
    datasets: [
      {
        label: `KGCO2/${props.material.unit}`,
        data: labels.map((item, i) => datas[i]),
        backgroundColor: '#27e693',
        datalabels: "#FFFFFF"
      },
      
    ],
  };
  return (
    <div style={{width: '100%'}}>
      <Bar className="" options={options} data={data} />
    </div>
    
  )
}


export default BarChart