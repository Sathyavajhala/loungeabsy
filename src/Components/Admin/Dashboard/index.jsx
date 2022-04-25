import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['Java Developers', 'Salesforce Developers', 'Web Developers',
           'Mobile Developers','HR'],
  datasets: [
    {
      label: 'Active Canditates',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [19, 25, 15, 12, 6]
    }
  ]
}

export default class Dashboard extends React.Component {
  render() {
    return (
      <div style={{width:500,height:400,margin:20}}>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Canditates',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}