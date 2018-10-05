import React, { Component } from 'react';

import './DisplayData.css';

class DisplayData extends Component {
  render() {
    let data = (
      <tbody>
        <tr>
          <td>No data found</td>
          <td />
        </tr>
      </tbody>
    );

    if (this.props.data) {
      data = this.props.data.map((obj, key) => {
        let returnedObj = null;

        const startDate = this.props.startDate;
        const endDate = this.props.endDate === '' ? Number.MAX_SAFE_INTEGER.toString() : this.props.endDate;
        const objDate = (obj.date.split('-').join(''));

        if (objDate > startDate && objDate < endDate) {
          returnedObj = (
            <tbody key={key}>
              <tr>
                <td>{obj.date}</td>
                <td>{obj.value}</td>
              </tr>
            </tbody>
          );
        }
        return returnedObj;
      });
    }

    return (
      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </tbody>
          {data}
        </table>
      </div>
    );
  }
}

export default DisplayData;
