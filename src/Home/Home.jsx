import React, { Component } from 'react';
import DisplayCategory from '../DisplayCategory/DisplayCategory'

import './Home.css'

class Home extends Component {
  state = {
  	categories: {
  		"bonding": false,
  		"unbonding": false,
  		"injections": false,
  		"battery": false,
  		"temperature": false,
  		"errors": false,
  	},
    selected: [],
    startDate: "",
    endDate: ""
  }

  toggleCategory = (category) => {
    // adds or removes selected cat
    let newSelected = this.state.selected
    if(this.state.categories[category]){
      newSelected = newSelected.filter(cat => cat !== category)
    }
    else {
      newSelected.push(category)
    }

    // adjusts the value in categories object
  	let newCategories = this.state.categories
  	newCategories[category] = !this.state.categories[category]
  	this.setState({
      categories: newCategories,
      selected: newSelected
    })
  }

  render() {
  	// loops through object keys to create a button for each category
  	const categoriesDisplayed = Object.keys(this.state.categories).map((cat, id) => {
      let classes = "btn category-selector"
      if(this.state.selected.includes(cat)){
        classes += " selected"
      }
  		return (
  			<div 
  			  className={classes}
  			  key={id}
  			  onClick={() => this.toggleCategory(cat)}>
  			  {cat}
  			</div>
  			)
  	} )

    return (
      <div className="home">
      	<div className="category-selector-container">
      	  {categoriesDisplayed}
      	</div>
        <div className="master-filter-container">
          <h1>Filter dates for all categories</h1>
          <div className="date-input">
            <label htmlFor="start">Start</label>
            <input 
              onChange={(e) => this.setState({startDate: e.target.value.split('-').join('')})}
              type="date" 
              id="start" 
              name="filter" />
          </div>
          <div className="date-input">
            <label htmlFor="end">End</label>
            <input 
              onChange={(e) => this.setState({endDate: e.target.value.split('-').join('')})}
              type="date" 
              id="end" 
              name="filter" />
          </div>
          <p>Note: this will override all individual dates</p>
        </div>
      	<div className="categories-container">
      	{	
      		// maps through each selected category and renders its information
      		this.state.selected.map((c, id) => {
      			return  <DisplayCategory startDate={this.state.startDate} endDate={this.state.endDate} key={id} name={c} />
      		})
      	}
      	</div>
      </div>
    );
  }
}

export default Home;
