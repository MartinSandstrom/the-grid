import React from 'react';
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis} from 'recharts';

const entriesToShow = ['value', 'income', 'health', 'past', 'future'];

export default class View extends React.Component {

    constructor(props) {
        super(props);
        let data = this.props.data;
        let metricData = [];
        let total = data.total;
        // The charts wants an array of properties.
        // The properties to show is specified in entriesToShow array.
        Object.entries(data).forEach((entry) => {
            if (entriesToShow.indexOf(entry[0]) > -1) {
                metricData.push({
                    name: entry[0],
                    value: entry[1],
                    fullmark: total
                });
            }
        });
        this.state = {metricData};
    }

    render() {
        return (
            <div className="col-sm-6 col-lg-4 d-flex align-items-stretch mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title text-center">{this.props.name}</h6>
                    <ResponsiveContainer height={200} widht={200}>
                        <RadarChart data={this.state.metricData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <Radar name={this.props.name} dataKey="value" stroke="#22D900" fill="#39FF14" fillOpacity={0.6}/>
                        </RadarChart>
                    </ResponsiveContainer>
                    <p className="card-text">{this.props.desc}</p>
                  </div>
                </div>
            </div>
        );
    }
}
