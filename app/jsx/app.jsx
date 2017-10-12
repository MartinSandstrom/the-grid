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
    }
};

const NUMBER_OF_COMPANIES = 30;

class TheGrid extends React.Component {
    constructor() {
        super()
        this.state = {
            companies: [],
            offset: 0
        }
    }

    componentDidMount = () =>  {
        this.getMoreCompanies();
        window.addEventListener("scroll", this.onScroll);
    }

    getMoreCompanies = () => {
        API_CONFIG.data = {
            'offset': this.state.offset,
            'size': NUMBER_OF_COMPANIES,
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
        };
        axios(API_CONFIG).then(this.onDataFetched).catch(this.onError);
    }

    onError = (error) => console.log(error);

    onDataFetched = (response) => {
        let companies = this.state.companies;
        let offset = this.state.offset + NUMBER_OF_COMPANIES;
        companies = companies.concat(response.data.data);
        this.setState({companies, offset})
    }

    renderCompanies = () => {
        let companies = this.state.companies.map((company, index) => {
            return (<CompanyCard data={company.score.data} desc={company.info.data.description} name={company.name} key={index}></CompanyCard>);
        });
        return companies;
    }


    onScroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.getMoreCompanies();
        }
    }

    render() {
        return (
            <div className="">
                <h1>Tha grid</h1>
                <div className="card-deck" onScroll={this.onScroll}>
                    {this.renderCompanies()}
                </div>
            </div>
        );
    }
}

render(
    <TheGrid/>, document.getElementById('app'));
