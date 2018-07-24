import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/users';
import  "./Dash.css";

 class Chart extends Component{
     componentDidMount(){
         console.log(this.props)
         this.props.getUser()
         this.getCiscoData()
     }
    constructor(){
        super()
        this.state = {
            ciscoData:{},
            chartData: {
            
                labels: ['Wrap Rate', "Availability", "Not Ready %", "NPS" ],
                datasets:[{
                    label: ['Stats MTD'],
                    data:[
                        96.5,
                        85,
                        12,
                        83.4,
                      
                    ],
                    backgroundColor: [
                        '#E37B40',
                        '#46B29D',
                        '#DE5B49',
                        '#324D5C',
                      
                    ]
                }]
            },
            morechartdata: {
                type:'radar',
                labels: ['Wrap Rate', "Availability", "Not Ready %", "NPS" ],
                datasets:[{
                    label: ['Stats MTD'],
                    data:[
                        96.5,
                        85,
                        12,
                        83.4,
                      
                    ],
                    backgroundColor: [
                        '#E37B40',
                        '#46B29D',
                        '#DE5B49',
                        '#324D5C',
                      
                    ]
                }]
            }
        }
        this.getCiscoData = this.getCiscoData.bind(this)
    }

    getCiscoData(){
        this.props.getUser().then(
        axios.get('/api/cisco/' + this.props.user.emid,
          ).then((response)=> {
            // this.setState({ciscoData:response.data})
            // console.log(response.data)
            // console.log(this.props)
        }))
    }

    render(){
        return(
            <div className="content">
            <Bar 
            data={this.state.chartData}
            width={1000}
            height={300}
            
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            callback: function(value) {
                                return value + "%"
                            }
                        },
                        scaleLabel: {
                            display: true,
                            
                        }
                    }]
                 },
                maintainAspectRatio:false,
                title: {
                    display: true,
                    text: 'Agent Metrics MTD'
                },
                layout: {
                    padding: {
                        top:50,
                        left: 240,
                        // right:10,
                        // bottom:10
                    },
                    // justifyContent: "space-around",
                    
                }
            }}
            />
              
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps, {getUser})(Chart)