import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Chart extends Component{
    constructor(){
        super()
        this.state = {
            chartData: {
                labels: ['Boston', "Worcester", "Springfield", "Lowell", "Cambridge"," New Bedford" ],
                datasets:[{
                    label: 'no.',
                    data:[
                        10,
                        8,
                        5,
                        2,
                        7,
                        9,
                        0,
                        20
                    ],
                    backgroundColor: [
                        '#E37B40',
                        '#46B29D',
                        '#DE5B49',
                        '#324D5C',
                        '#F0CA4D',
                        'rgba(255,159,64,0.6)',
                        'rgba(255,99,132,0.6)'
                    ]
                }]
            }
        }

    }
    render(){
        return(
            <div className="chart">
            <Bar 
            data={this.state.chartData}
            width={600}
            height={300}
            
            options={{
                maintainAspectRatio:false,
                layout: {
                    padding: {
                        top:50,
                        left: 240,
                        right:10,
                        bottom:10
                    },
                    justifyContent: "space-around",
                    
                }
            }}
            />
            </div>
        )
    }
}