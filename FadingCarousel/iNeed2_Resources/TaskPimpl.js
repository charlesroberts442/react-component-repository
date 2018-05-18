/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the TaskPimpl class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc TaskPimpl objects are the private implementation objects 
 *            used to contain the data of Task objects. 
 */
class TaskPimpl
{
	constructor(Name)
	{
		this.debug = false;

		this.name = Name;

		this.urgency       = parseInt(50);
		

		this.importance       = parseInt(50);
		

		this.completion       = parseInt(0);
		

		this.effort       =  parseInt(25);
		

	 	this.activityLog = "";
	 	this.archived = false;

	} // End of constructor

} // End of class TaskPimpl