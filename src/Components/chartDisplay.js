import React from 'react';
import Chart from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

export default class ChartDisplay extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const title = this.props.title;
        const description = this.props.description;
        const numbers = this.props.numbers;
        const labels = this.props.labels;
        const colors = this.props.colors;
        const settings = {
            labels : labels,
            datasets: [{
                backgroundColor : colors,
                data : numbers
            }]
        };
        return(
            <div style={{width: '70%', leftMargin:'15%'}}>
                <Doughnut
                    data={settings}
                    options={{
                        responsive : true,
                        maintainAspectRatio : true,
                        title : {
                            display : true,
                            fontSize : 23,
                            text : [title, description]
                        },
                        legend : {
                            display : true,
                            position : 'left'
                        }
                    }}
                />
            </div>
        );
    }
};