import React, { Component } from 'react';
import FadingCarousel from "./components/FadingCarousel";
import SamOne from "./components/FadingCarousel/SamOne";
import SamTwo from "./components/FadingCarousel/SamTwo";
import SamThree from "./components/FadingCarousel/SamThree";
import SamFour from "./components/FadingCarousel/SamFour";
import './App.css';
const App = () => 

<div>

	<FadingCarousel 
		componentArray=
		{
			[
	   			<SamOne/>,
	   			<SamTwo/>,
	   			<SamThree/>,
	   			<SamFour/>
	   		]
		}
	/>

</div>






export default App;
