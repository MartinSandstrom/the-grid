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
            offset: 0,
            noMoreResults: false
        }
        window.addEventListener("scroll", this.onScroll);
    }

    componentDidMount = () => this.getMoreCompanies();

    onScroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.getMoreCompanies();
        }
    }

    getMoreCompanies = () => {
        this.setState({isLoadingMoreCompanies: true})
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

    onError = (error) => {
        console.log(error);
        this.setState({isLoadingMoreCompanies: false});
    }

    onDataFetched = (response) => {
        this.setState({isLoadingMoreCompanies: false});
        if (response.data.data.length === 0) {
            this.setState({noMoreResults: true});
        } else {
            let companies = this.state.companies.concat(response.data.data);
            let offset = this.state.offset + NUMBER_OF_COMPANIES;
            this.setState({companies, offset});
        }
    }

    renderCompanies = () => {
        let companies = this.state.companies.map((company, index) => {
            return (
                <CompanyCard data={company.score.data} desc={company.info.data.description} name={company.name} key={index}></CompanyCard>
            );
        });
        return companies;
    }

    renderNoMoreItems = () => {
        if (this.state.noMoreResults) {
            return (
                <h5 className="text-center">No more items</h5>
            );
        }
    }

    renderLoader = () => {
        if (this.state.isLoadingMoreCompanies) {
            return <img src="./img/fruits-apple.gif" className="img-responsive"></img>
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card-deck" onScroll={this.onScroll}>
                    {this.renderCompanies()}
                </div>
                <div className="mx-auto text-center">
                    {this.renderLoader()}
                </div>
                {this.renderNoMoreItems()}
            </div>
        );
    }
}

render(
    <TheGrid/>, document.getElementById('app'));
