import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import CompanyCard from './CompanyCard.jsx';

const API_CONFIG = {
    url: 'https://simplywall.st/api/grid/filter?include=info%2Cscore',
    method: 'POST',
    headers: {
        'Accept': 'application/vnd.simplywallst.v2',
        'Content-Type': 'application/json'
    },
    data: {
        'offset': 0,
        'size': 100,
        'rules': [
            [
                'is_fund', '=', 'false'
            ],
            [
                'primary_flag', '=', 'true'
            ],
            [
                'analyst_count', '>', '0'
            ],
            [
                'country_name', '=', 'AU'
            ],
            [
                'value_score', '>', 1
            ],
            ['order_by', 'market_cap', 'desc']
        ]
    }
};

class TheGrid extends React.Component {
    constructor() {
        super()
        this.state = {
            companies: []
        }
    }

    componentDidMount = () => axios(API_CONFIG).then(this.onDataFetched).catch(this.onError);

    onError = (error) => console.log(error);

    onDataFetched = (response) => this.setState({companies: response.data.data});

    renderCompanies = () => this.state.companies.map((company, index) => <CompanyCard desc={company.info.data.description} name={company.name} key={index}></CompanyCard>);

    render() {
        return (
            <div className="container">
                <h1>Tha grid</h1>
                    <div className="card-deck">
                        {this.renderCompanies()}
                    </div>

            </div>
        );
    }
}

render(
    <TheGrid/>, document.getElementById('app'));
