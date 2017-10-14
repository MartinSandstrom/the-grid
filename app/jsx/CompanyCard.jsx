import React from 'react';
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis} from 'recharts';

export default class CompanyCard extends React.Component {

    constructor(props) {
        super(props);
        let data = this.props.data;
        let dataObject = [];
        let total = data.total;
        // The charts wants an array of properties sadPanda
        Object.entries(data).forEach((entry) => {
            if (entry[0] != 'total' && entry[0] != 'misc' &&  entry[0] != 'management' &&  entry[0] != 'sentence') {
                dataObject.push({
                    name: entry[0],
                    value: entry[1],
                    fullmark: total
                });
            }
        });
        this.state = {dataObject};
    }

    render() {

        return (
            <div className="col-sm-6 col-lg-4 d-flex align-items-stretch mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{this.props.name}</h6>
                    <ResponsiveContainer height={200} widht={200}>
                        <RadarChart data={this.state.dataObject}>
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
