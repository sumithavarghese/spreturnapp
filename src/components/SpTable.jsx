import React, { Component } from 'react'
import * as ReactBootStrap from "react-bootstrap";


class SpTable extends Component {

  render() {
    const items = this.props.cumulative.map(function (v1, index) {
      return (<tr key={index}>
        <td>{v1.year}</td>
        <td>{v1.totalReturn}</td>
        <td>{Math.round(v1.cumulativeSum * 100 + 100 * Number.EPSILON) / 100}</td>
      </tr>)
    });

    return (
      <div className="SpTable">
        <br />
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Return</th>
              <th>Cumulative Returns</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    );
  }
}

export default SpTable
