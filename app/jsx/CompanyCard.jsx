import React from 'react';

export default class CompanyCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="col-sm-6 col-md-4 d-flex align-items-stretch">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{this.props.name}</h4>
                    <p className="card-text">{this.props.desc}</p>
                  </div>
                </div>
            </div>
        );
    }
}
