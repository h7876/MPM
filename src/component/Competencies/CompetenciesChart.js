import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/users';


 class CompetenciesChart extends Component{
     componentDidMount(){
         console.log(this.props)
         this.props.getUser()
         this.getCiscoData()
     }
    constructor(){
        super()
        this.state = {
            ciscoData:{},
    
            morechartdata: {
                type:'radar',
                labels: ['Communication', "Attendance", "Effort", "Professionalism" ],
                datasets:[{
                    label: ['Expected'],
                    data:[
                        3,
                        3,
                        3,
                        3,
                    ],
                   borderColor: [
                        '#3A83A8',
                    ]
                },
                {
                    label: ['Current'],
                    data:[
                        3,
                        5,
                        3,
                        4,
                    ],
                    borderColor: [
                        '#A60E0E',
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
            <div>
            <Radar 
            data={this.state.morechartdata}
            width={600}
            height={600}
            
            options={{

                maintainAspectRatio:true,
                title: {
                    display: true,
                    text: 'Competencies YTD'
                },
                scale: {
                    ticks:{
                    beginAtZero: true,
                    min: 0,
                    max: 5
                }}
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

export default connect(mapStateToProps, {getUser})(CompetenciesChart)