/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains javascript utility functions.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc The Utility class is essentially a namespace for
 * methods of iNeed2 Utility methods.
 */
class Utility
{
	constructor(){}

	static validateNumber(Name, minValue, maxValue, Value)
	{
		let valueAsNum = 0;

		if(Value === null)
		{
			throw new Error(Name + " cannot be null.");
		}

		else if(isNaN(Value))
		{
			throw new Error(Name + " must be a number.");
		}

		else
		{
			valueAsNum = parseInt(Value);
		}
		
		if(valueAsNum < minValue)
		{
			throw new Error(Name + " cannot be less than " + minValue + ".");
		}

		else if(valueAsNum > maxValue) 
		{
			throw new Error(Name + " cannot be greater than " + maxValue + ".");
		}

	} // End of validateNumber()

} // End of class utility