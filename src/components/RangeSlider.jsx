import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import data from './data.json';
import SpTable from '../components/SpTable';


class RangeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: 0,
            currentMin: 0,
            currentMax: 0,
            cumulativeAnnualReturns: [],
            currentCumulativeReturns: []
        };
        this.displayData = this.displayData.bind(this);
        this.createCumulativeData = this.createCumulativeData.bind(this);
    }

    componentDidMount() {
        const myData = [].concat(data)
            .sort((a, b) => a.year - b.year);
        let cumulativeReturns = myData.map(item => {
            const container = {};
            container.year = item.year;
            container.totalReturn = item.totalReturn;
            container.cumulativeSum = 0;
            return container;
        })
        this.createCumulativeData(cumulativeReturns);
        this.setState({ min: myData[0].year, max: myData[myData.length - 1].year, currentMin: myData[0].year, currentMax: myData[myData.length - 1].year, cumulativeAnnualReturns: cumulativeReturns, currentCumulativeReturns: cumulativeReturns });
    }

    createCumulativeData(cumulativeReturnParam) {
        cumulativeReturnParam.map(function (value, index) {
            if (index === 0) {
                return value['cumulativeSum'] = value.totalReturn;
            } else {
                let prev = cumulativeReturnParam[index - 1].cumulativeSum;
                return value['cumulativeSum'] = (prev * 1) + (value.totalReturn * 1);
            }
        });
    }

    displayData = value => {
        let filteredvalues = this.state.cumulativeAnnualReturns.filter(function (number) {
            return number.year >= value[0] && number.year <= value[1];
        });
        this.createCumulativeData(filteredvalues);
        this.setState({ currentMin: value[0], currentMax: value[1], currentCumulativeReturns: filteredvalues });
    };

    render() {
        const Slider = require('rc-slider');
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);
        return (
            <div className="RangeSlider">
                <Range allowCross={false} min={this.state.min} max={this.state.max} defaultValue={[this.state.currentMin, this.state.currentMax]}
                    marks={{ [this.state.min]: this.state.min, [this.state.max]: this.state.max }} onAfterChange={this.displayData} />
                <SpTable cumulative={this.state.currentCumulativeReturns} />
            </div>);
    }
}
export default RangeSlider
