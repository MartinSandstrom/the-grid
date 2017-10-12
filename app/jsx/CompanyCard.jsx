import React from 'react';
import {ResponsiveContainer, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

 const data = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

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
            <div className="col-sm-6 col-lg-4 d-flex align-items-stretch text-center mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <ResponsiveContainer height={200} widht={200}>
                        <RadarChart data={this.state.dataObject}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis/>
                          <Radar name={this.props.name} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                        </RadarChart>
                    </ResponsiveContainer>
                    <p className="card-text">{this.props.desc}</p>
                  </div>
                </div>
            </div>
        );
    }
}
