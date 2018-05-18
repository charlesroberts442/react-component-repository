/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
 /**
 * @file Contains the class definition of the Fading-Carousel react
 * component class.  
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

import React from "react";
import "./FadingCarousel.css";

/**
 * @classdesc The Fading-Carousel class creates objects that are react
 * components.  Fading Carousel objects have a number of divs one on top
 * of the other with only one div visible.
 */
class FadingCarousel extends React.Component
{
	constructor(props)
	{
		super();

		this.state = 
		{
      		activeIndex: 0
    	};

	} // End of constructor

	onNextClick = () => 
	{
	    if(this.state.activeIndex < 3)
	    {
	      this.setState({activeIndex: this.state.activeIndex + 1});
	    } else 
	    {
	      this.setState({activeIndex: 0})
	    } 
  	}; // End of onNextClick()

  onPrevClick = () => 
  {
      if(this.state.activeIndex > 0) 
      {
        this.setState({activeIndex: this.state.activeIndex - 1});
      } else 
      {
        this.setState({activeIndex: 3})
      }
  }; // End of onPrevClick()

	render() 
	{
		
	
    return (

    	

    <div className='container'>
        <div className='buttons'>
          <button onClick={this.onPrevClick}>◀</button>
          <button onClick={this.onNextClick}>▶</button>
        </div>

		<ol className='slide-container' >
          {[1,2,3,4].map((item, index) => {
            let computedClass = index === (this.state.activeIndex) ? 'slide active' : 'slide';
            return <li className={computedClass} key={index}>{this.props.componentArray[index]}</li>
          })}
        </ol>
        
    </div>
    );

	} // End of render()

} // End of class Fading-Carousel
    
 export default FadingCarousel;   