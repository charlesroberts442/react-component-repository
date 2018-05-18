/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

/**
 * @file Contains the class definition of the TaskList class.
 * @author Charles Roberts
 * @copyright Charles Roberts 2018
 */

/**
 * @classdesc TaskList objects are essentially "ToDo Lists"
 */
class TaskList
{
	constructor(Name)
	{
		let _pimpl = new TaskListPimpl();

		_pimpl.name = Name;

		this.setName = function(name_in)
		{
			_pimpl.name = name_in;
		};

		this.getName = function()
		{
			return _pimpl.name;
		};


		/**
		 * setUrgencyWeight is the "setter" function for 
		 * setting the UrgencyWeight.
		 * @param {Number} UrgencyWeight_in the value
		 * for UrgencyWeight.  This parameter must be
		 * greater than zero and less than one hundred or an
		 * error object will be thrown. 
		 * 
		 */
		this.setUrgencyWeight = function(UrgencyWeight_in)
		{
			try
			{
				Utility.validateNumber("UrgencyWeight", 0, 100, UrgencyWeight_in);
				let urgencyWeightAsNum = parseInt(UrgencyWeight_in);
				_pimpl.urgencyWeight = urgencyWeightAsNum;
			}

			catch(err)
			{
				console.log(err);
				throw err;
			}

		}; // End of this.setUrgencyWeight()


		/**
		 * getUrgencyWeight is the "getter" function for getting
		 * the UrgencyWeight
		 * @return {Number} The urgency weight.
		 */
		this.getUrgencyWeight = function()
		{
			return _pimpl.urgencyWeight;
		};


		/**
		 * setImportanceWeight is the "setter" function for setting
		 * the Importance Weight.
		 * @param {Number} ImportanceWeight_in The value for Importance
		 * Weight.  This parameter must be
		 * greater than zero and less than one hundred or an
		 * error object will be thrown. 
		 */
		this.setImportanceWeight = function(ImportanceWeight_in)
		{
			try
			{
				Utility.validateNumber("ImportanceWeight", 0, 100, ImportanceWeight_in);
				importanceWeightAsNum = parseInt(ImportanceWeight_in);
				_pimpl.importanceWeight = importanceWeightAsNum;
			}

			catch(err)
			{
				console.log(err);
				throw err;
			}

		}; // End of this.setImportanceWeight()


		/**
		 * getImportanceWeight is the "getter" function for getting the
		 * Importance Weight.
		 * @return {Number} The Importance Weight.
		 */
		this.getImportanceWeight = function()
		{
			return _pimpl.importanceWeight;

		}; // End of this.getImportanceWeight()


		/**
		 * setCompletionWeight is the "setter" function for setting the
		 * CompletionWeight.
		 * @param {Number} CompletionWeight_in The completion weight.
		 * This parameter must be greater than negative one hundred
		 *  and less than one hundred or an error object will be thrown. 
		 * 
		 */
		this.setCompletionWeight = function(CompletionWeight_in)
		{
			try
			{
				Utility.validateNumber("CompletionWeight", -100, 100, CompletionWeight_in);
				let completionWeightAsNum = parseInt(CompletionWeight_in);
				_pimpl.completionWeight = completionWeightAsNum;
			}

			catch(err)
			{
				console.log(err);
				throw err;
			}

		}; // End of this.setCompletionWeight()


		/**
		 * getCompletionWeight is the "getter" function for getting
		 * the completion weight.
		 * @return {Number} The completion weight.
		 */
		this.getCompletionWeight = function()
		{
			return _pimpl.completionWeight;

		}; // End of this.getCompletionWeight()


		/**
		 * setEffortWeight is the "setter" function for setting
		 * the effort weight.  
		 *  
		 * @param {Number} EffortWeight_in The effort weight.
		 * This parameter must be greater than negative one hundred
		 *  and less than one hundred or an error object will be thrown. 
		 * 
		 */
		this.setEffortWeight = function(EffortWeight_in)
		{
			try
			{
				Utility.validateNumber("EffortWeight", -100, 100, EffortWeight_in);
				let effortWeightAsNum = parseInt(EffortWeight_in);
				_pimpl.effortWeight = effortWeightAsNum;
			}

			catch(err)
			{
				console.log(err);
				throw err;
			}
		}; // End of this.setEffortWeight()


		/**
		 * getEffortWeight is the "getter" method for getting
		 * effort weight
		 * @return {Number} The effort weight.
		 */
		this.getEffortWeight = function()
		{
			return _pimpl.effortWeight;

		}; // End of this.getEffortWeight()


		/**
		 * addTaskToList adds a task to the TaskList object
		 * @param {Object} taskToAdd The task to add.
		 */
		this.addTaskToList = function(taskToAdd)
		{
			_pimpl.list.push(taskToAdd);
		};

		this.sort = function()
		{
			_pimpl.list.sort(function(a,b){return b.getPriority() - a.getPriority();});


		}; // End of this.sort()

		this.getNumberOfTasks = function()
		{
			return _pimpl.list.length;

		}; // End of this.getNumberOfTasks()

		this.getTask = function(indexToGet)
		{
			let retValue = {};

			retValue = _pimpl.list[indexToGet];

			return retValue;
		};

		this.getTaskNamed = function(name_in)
		{
			let i = 0;
			let retValue = null;

			for(i=0; i<_pimpl.list.length; ++i)
			{
				let currentTask = _pimpl.list[i];

				if(currentTask.getName().trim().toUpperCase() === name_in.trim().toUpperCase())
				{
					retValue = currentTask;
					break;
				}
			}

			
			return retValue;
		};

		this.deleteTaskAt = function(index)
		{
			
			_pimpl.list.splice(index, 1);
		};

		this.deleteTask = function(taskToDelete)
		{
			let i = 0;
			for(i=0; i< _pimpl.list.length; ++i)
			{
				let currentTask = _pimpl.list[i]; 

				if( currentTask.getName().trim().toUpperCase() === taskToDelete.getName().trim().toUpperCase() )
				
				{
					_pimpl.list.splice(i, 1);
					break;
				}
			}
		}; // End of this.deleteTask()

		this.encryptedDataExport = function(passPhrase)
		{
			let i = 0;
			let retValue = "";
			let retVal = "";
			
			let retObject =
			{
				encryptedTaskData: [],
				encryptedListData: ""
			};

			// An object to hold list parameters for encrypting
			let listDataToEncrypt =
			{
				name: "",
				urgencyWeight: 0,
				importanceWeight: 0,
				completionWeight: 0,
				effortWeight: 0
			};

			/**************************************************
             *                  List Data                     *
             **************************************************/   
			// Set the values in listDataToEncrypt
			listDataToEncrypt.name = _pimpl.name;
			listDataToEncrypt.urgencyWeight = _pimpl.urgencyWeight;
			listDataToEncrypt.importanceWeight = _pimpl.importanceWeight;
			listDataToEncrypt.completionWeight = _pimpl.completionWeight;
			listDataToEncrypt.effortWeight = _pimpl.effortWeight;

			// Stringify the listDataToEncrypt object
			let stringToEncrypt = JSON.stringify(listDataToEncrypt);

			// Encrypt the string representation of the list data
			let encryptedListString =  CryptoJS.AES.encrypt(stringToEncrypt, passPhrase);

			// Store the encrypted string in retValue
			retObject.encryptedListData = encryptedListString.toString();

			/**************************************************
             *                  Task Data                     *
             **************************************************/   
			// Gather all the encrypted task data
			for( i = 0; i < _pimpl.list.length; ++i)
			{
				let currentTask = _pimpl.list[i];
				let currentEncryptedString = currentTask.encryptedDataExport(passPhrase);
				retObject.encryptedTaskData.push(currentEncryptedString);
			}

			/**************************************************
             *              Make Output String                *
             **************************************************/  
			retValue = JSON.stringify(retObject);

			return retValue;

		}; // End of encryptedDataExport()

		this.encryptedDataImport = function(encryptedString, passPhrase)
		{
			let i = 0;
			let taskArray = [];
			
			let topObject = JSON.parse(encryptedString);

			/**************************************************
             *                  List Data                     *
             **************************************************/   

			let topListObject = topObject.encryptedListData;

			let clearListObjectString = CryptoJS.AES.decrypt(
                    topListObject,passPhrase).toString(CryptoJS.enc.Utf8);

			let clearListObject = JSON.parse(clearListObjectString);

		_pimpl.name             = clearListObject.name;
		_pimpl.urgencyWeight    = clearListObject.urgencyWeight;
		_pimpl.importanceWeight = clearListObject.importanceWeight;
		_pimpl.completionWeight = clearListObject.completionWeight;
		_pimpl.effortWeight     = clearListObject.effortWeight;


		/**************************************************
         *                  Task Data                     *
         **************************************************/   
         
         taskArray = topObject.encryptedTaskData;

         // Clear the current tasks before adding the ones retrieved.
         while(_pimpl.list.length > 0)
         {
         	_pimpl.list.pop();
         }

         for(i = 0; i < taskArray.length; ++i)
         {
         	
         	let encryptedTaskString = taskArray[i];
         	let newTask = new Task();
         	newTask.encryptedDataImport(encryptedTaskString, passPhrase);
         	this.addTaskToList(newTask);
         }


		}; // End of encryptedDataRetrieve()


		this.encryptedDataSave = function(passPhrase)
		{
			let i = 0;
			let retValue = "";
			let retVal = "";
			let loc = window.location.pathname;
    		let array = loc.split("/");
    		let dir = array[array.length - 2];
    		let storageKey = "4 " + dir + " iNeed2";

			let retObject =
			{
				encryptedTaskData: [],
				encryptedListData: ""
			};

			/**************************************************
             *                  List Data                     *
             **************************************************/   

			// An object to hold list parameters for encrypting
			let listDataToEncrypt =
			{
				name: "",
				urgencyWeight: 0,
				importanceWeight: 0,
				completionWeight: 0,
				effortWeight: 0
			};

			// Set the values in listDataToEncrypt
			listDataToEncrypt.name = _pimpl.name;
			listDataToEncrypt.urgencyWeight = _pimpl.urgencyWeight;
			listDataToEncrypt.importanceWeight = _pimpl.importanceWeight;
			listDataToEncrypt.completionWeight = _pimpl.completionWeight;
			listDataToEncrypt.effortWeight = _pimpl.effortWeight;

			// Stringify the listDataToEncrypt object
			let stringToEncrypt = JSON.stringify(listDataToEncrypt);

			// Encrypt the string representation of the list data
			let encryptedListString =  CryptoJS.AES.encrypt(stringToEncrypt, passPhrase);

			// Store the encrypted string in retValue
			retObject.encryptedListData = encryptedListString.toString();

			/**************************************************
             *                  Task Data                     *
             **************************************************/   

			// Gather all the encrypted task data
			for( i = 0; i < _pimpl.list.length; ++i)
			{
				let currentTask = _pimpl.list[i];
				let currentEncryptedString = currentTask.encryptedDataExport(passPhrase);
				retObject.encryptedTaskData.push(currentEncryptedString);
			}

			/**************************************************
             *              Make Output String                *
             **************************************************/  


			retValue = JSON.stringify(retObject);

			localStorage.setItem
    	(
        	storageKey, 
        	retValue
    	);


			//return retValue;

		}; // End of encryptedDataSave()

		this.encryptedDataRetrieve = function(passPhrase)
		{
			let i = 0;
			let taskArray = [];

			///////////////////////////
			let loc = window.location.pathname;
	    	let nameArray = loc.split("/");
	    	let dir = nameArray[nameArray.length - 2];
	    	let storageKey = "4 " + dir + " iNeed2";
	    	///////////////////////////

			let encryptedString = localStorage.getItem(storageKey);
			let topObject = JSON.parse(encryptedString);

			/**************************************************
             *                  List Data                     *
             **************************************************/   

			let topListObject = topObject.encryptedListData;

			let clearListObjectString = CryptoJS.AES.decrypt(
                    topListObject,passPhrase).toString(CryptoJS.enc.Utf8);

			let clearListObject = JSON.parse(clearListObjectString);

		_pimpl.name             = clearListObject.name;
		_pimpl.urgencyWeight    = clearListObject.urgencyWeight;
		_pimpl.importanceWeight = clearListObject.importanceWeight;
		_pimpl.completionWeight = clearListObject.completionWeight;
		_pimpl.effortWeight     = clearListObject.effortWeight;

		/**************************************************
         *                  Task Data                     *
         **************************************************/   
         
         taskArray = topObject.encryptedTaskData;

         // Clear the current tasks before adding the ones retrieved.
         while(_pimpl.list.length > 0)
         {
         	_pimpl.list.pop();
         }

         for(i = 0; i < taskArray.length; ++i)
         {
         	
         	let encryptedTaskString = taskArray[i];
         	let newTask = new Task();
         	newTask.encryptedDataImport(encryptedTaskString, passPhrase);
         	this.addTaskToList(newTask);
         }

		}; // End of encryptedDataRetrieve()
		

		} // End of constructor()

} // End of class TaskListPimpl

