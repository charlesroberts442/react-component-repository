/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
 /**
 * @file Contains the class definition of the BackupRestoreScreen class.  
 * @author Charles Roberts
 * @copyright Charles Roberts 2017
 */

/**
 * @classdesc The BackupRestoreScreen is essentially a namespace for
 * methods of the Backup / Restore screen.
 */
class BackupRestoreScreen
{
	/**
    * Function for initializing BackupRestoreScreen objects.  Because this class
    * is essentially used only to create a namespace, the constructor does nothing.
    */
	constructor() {}

	/**
	 * initScreen() is the initializer for the Backup / Restore Screen
	 */
	static initScreen()
	{
		
		$("html").css("height", "100%)");
	    $("body").css("color", "#e0e0e0");
	    $("body").css("width", "100%");
	    $("body").css("height", "100%");
	    $("body").css("background-repeat", "no-repeat");
	    $("body").css("background-size", "cover");
	    $("body").css("background-image", "url('iNeed2_Resources/filing_cabinets_3b.jpg')");
		
	}

	/******************************************************************
	 *                                                                *
	 *       Event Handlers for Backup / Restore Screen Buttons       *
	 *                                                                *
	 ******************************************************************/

	/**
	 * backupClick() is the click handler for the backupClick event.
	 * @param {Object} event The click event to be handled.
	 */
	static backupClick(event)
	{
		BackupRestoreScreen.backupDataToFile();

	} // End of backupClick()


	/**
	 * loadClick() is the click handler for the loadClick event.
	 * @param {Object} event The click event to be handled.
	 */
	static loadClick(event)
	{
		BackupRestoreScreen.getEncryptedStringFromFile();

	} // End of loadClick()


	/**
	 * processClick() is the click handler for the processClick event.
	 * @param {Object} event The click event to be handled.
	 */
    static processClick(event)
    {
    	BackupRestoreScreen.processEncryptedStringFromFile();

    } // End of processClick


    /**
	 * saveClick() is the click handler for the saveClick event.
	 * @param {Object} event The click event to be handled.
	 */
	static saveClick(event)
	{
		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	} // End of BackupRestoreScreen.saveClick()


	/**
	 * retrieveClick() is the click handler for the retrieveClick event.
	 * @param {Object} event The click event to be handled.
	 */
	static retrieveClick(event)
	{
		BackupRestoreScreen.getDataFromLocalStorage();
		
	} // End of BackupRestoreScreen.retrieveClick()

	/***************************************************************
	 *                                                             *
	 *       Backup Restore Screen Methods                         *
	 *                                                             *
	 ***************************************************************/                                                      


	 /**
	  * saveTextAsFile() saves a string to a file.  The saved string
	  * is saved in the "Downloads directory in Linux systems."
	  */
	static saveTextAsFile(textToSave)
	{
	    let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	    let textToSaveAsURL  = window.URL.createObjectURL(textToSaveAsBlob);
	    let downloadLink     = document.createElement("a");

	    downloadLink.download  = getWebSiteName() + " data.bak";
	    downloadLink.innerHTML = "Download File";
	    downloadLink.href      = textToSaveAsURL;
	    downloadLink.onclick   = BackupRestoreScreen.destroyClickedElement;
	    downloadLink.style.display = "none";
	    document.body.appendChild(downloadLink);
	 
	    downloadLink.click();

	}; // End of saveTextAsFile()


	/**
	 * destroyClickedElement() is a helper method to the saveTextAsFile()
	 * method.
	 */
	static destroyClickedElement(event)
	{
	    document.body.removeChild(event.target);

	} // End of destroyClickedElement()


	/**
	 * backupDataToFile() is the top level method that is called to 
	 * backup all of the iNeed2 webpage's data to a local file.
	 * 
	 */
	static backupDataToFile()
	{
	    let encryptedString = taskList.encryptedDataExport(passPhrase);
	    BackupRestoreScreen.saveTextAsFile(encryptedString);

	} // End of backupDataToFile()


	/**
	 * 
	 */
	static processEncryptedStringFromFile()
	{
	    taskList.encryptedDataImport(restoreString, passPhrase);
	}

	static getEncryptedStringFromFile()
	{
	    var fileToLoad = document.getElementById("fileToLoad").files[0];
	 
	    var fileReader = new FileReader();
	    fileReader.onload = function(fileLoadedEvent) 
	    {
	        restoreString = fileLoadedEvent.target.result;
	       
	        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
	    };
	    fileReader.readAsText(fileToLoad, "UTF-8");

	} // End of getEncryptedStringFromFile()

	static saveDataToLocalStorage(passPhrase)
	{
	    let encryptedString = taskList.encryptedDataExport(passPhrase);
	    BackupRestoreScreen.setEncryptedStringInLocalStorage(encryptedString);

	} // End of saveDataToLocalStorage()

	static getDataFromLocalStorage()
	{
	    let encryptedString = BackupRestoreScreen.getEncryptedStringFromLocalStorage();
	    taskList.encryptedDataImport(encryptedString, passPhrase);

	} // End of getDataFromLocalStorage()

	static setEncryptedStringInLocalStorage(encryptedString)
	{
	    let storageKey = getWebSiteName();
	    localStorage.setItem
	    (
	        storageKey, 
	        encryptedString
	    );

	}

	static getEncryptedStringFromLocalStorage()
	{
	    let storageKey = getWebSiteName();
	    let encryptedString = localStorage.getItem(storageKey);
	    return encryptedString;

	}  // End of getEncryptedStringFromLocalStorage

} // End of class BackupRestoreScreen

/**
 * BackupRestoreScreen.restoreString is a namespace varible that refers
 * to the string that is retrieved from either local storage or the
 * backup file.
 * @type {String}
 */
BackupRestoreScreen.restoreString = "";
