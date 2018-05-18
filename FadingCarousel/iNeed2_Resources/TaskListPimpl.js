/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the TaskListPimpl class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc TaskPimpl objects are the private implementation objects 
 *            used to contain the data of TaskList objects. 
 */
class TaskListPimpl
{

	constructor()
	{
		this.debug            = false;
		this.name             = "";
		this.list             = [];
		this.urgencyWeight    = parseInt(100);
		this.importanceWeight = parseInt(75);
		this.completionWeight = parseInt(40);
		this.effortWeight     = parseInt(-40);


	} // End of constructor()

} // End of class TaskListPimpl