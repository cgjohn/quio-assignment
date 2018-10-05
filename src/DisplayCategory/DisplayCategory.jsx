import React, { Component } from 'react';

import './DisplayCategory.css';
import Spinner from '../Spinner/Spinner'
import DisplayData from './DisplayData/DisplayData'

class DisplayCategory extends Component {
  state = {
  	data: null,
  	startDate: (""),
  	endDate: (""),
  	fetchedData: false,
    fetchError: ""
  } 


  componentDidMount() {
    this.setState({
      startDate: this.props.startDate,
      endDate: this.props.endDate
    })
  	const url = `http://assignment.quio.com/${this.props.name}`

  	fetch(url)
	  .then(response => response.json())
	  .then(json => this.setState({
	  	data: json,
	  	fetchedData: true,
      fetchError: false
	  }))
	  .catch(err => this.setState({fetchError: true}))
  }

  componentDidUpdate(prevProps) {
    // allows component to update when parent's dates change
    if(this.props !== prevProps){
      this.setState({
        startDate: this.props.startDate,
        endDate: this.props.endDate
      })
    }
  }

  dateHandler = (e, stateVal) => {
    // if target value it null (reset locally), defaults back to parents time instead of rendering entire list
    e.target.value ? this.setState({[stateVal]: e.target.value.split('-').join('')}) :  this.setState({[stateVal]: this.props[stateVal]})
  }

  render() {
    let renderTable = <Spinner />
    if(this.state.fetchError) {
      renderTable = <p>There was an error fetching the data</p>
    }
    if(this.state.fetchedData){
    	renderTable = <DisplayData data={this.state.data} startDate={this.state.startDate} endDate={this.state.endDate} />
    } 

    return (
      <div className="display-container">
      	<h2>{this.props.name}</h2>
      	<div className="date-container">
      		<h5>Filter Individual Dates</h5>
      		<div className="date-input">
      			<label htmlFor="start">Start</label>
        		<input 
        			onChange={(e) => this.dateHandler(e, "startDate")}
        			type="date" 
        			id="start" 
        			name="filter" />
      		</div>
      		<div className="date-input">
	          <label htmlFor="end">End</label>
	        	<input 
        			onChange={(e) => this.dateHandler(e, "endDate")}
        			type="date" 
        			id="end" 
        			name="filter" />
	        </div>
      	</div>
      	
      	{renderTable}
        
      </div>
    );
  }
}

export default DisplayCategory;
