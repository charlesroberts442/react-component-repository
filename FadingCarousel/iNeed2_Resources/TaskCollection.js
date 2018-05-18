/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the TaskCollection class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc TaskCollection objects are collections of tasks to do.
 */
class TaskCollection
{
	constructor()
	{
		_collection = [];

		this.addTask = function(taskToBeAdded)
		{
			_collection.push(taskToBeAdded);
			
		}; // End of this.addTask()

	} // End of constructor

} // End of class TaskCollection
