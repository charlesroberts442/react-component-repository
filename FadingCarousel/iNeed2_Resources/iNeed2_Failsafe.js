/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

let taskList = new TaskList(); 
var arcSet = [];
var passPhrase = "Little Miss Muffet sat on a tuffet";
let nameString = "";

var currentTask;
var arcTask;
var taskCount = 0;

/**
 * [ToDo: Move this into the iNeed2 namespace
 */
let restoreString = "";




let retrieveCloudData = function()
{

};

let retrieveLocalData = function(dataSet, storageKey)
{
    let i = 0;
    let monoString = localStorage.getItem(storageKey);

    let encryptedArray = JSON.parse(monoString);

    for(i = 0; i < encryptedArray.length; ++i)
    {
        let decryptedItem = CryptoJS.AES.decrypt(
                    encryptedArray[i],passPhrase).toString(CryptoJS.enc.Utf8);
    
        let parsedItem = JSON.parse(decryptedItem);

        dataSet.push(parsedItem);
        
    }
}; // End of retrieveLocalData()

let saveCloudData = function()
{

};

let saveLocalData = function(dataSet, storageKey)
{
    let encryptedSet = [];
    let i = 0;
    for (i=0; i<dataSet.length; ++i)
    {
        // Stringify and encrypt the ith task
        encryptedSet.push
        (
            CryptoJS.AES.encrypt
            (
                JSON.stringify(dataSet[i]),passPhrase
            ).toString()
        );
  
    } // End of for (i=0; i<encryptedSet.length; ++i)

    // Stringify and store the encrypted set
    localStorage.setItem
    (
        storageKey, 
        JSON.stringify(encryptedSet)
    );


}; // End of saveLocalData()

let saveData = function()
{
    let localSet = [];
    let cloudSet = [];
    let i = 0;

    for(i=0; i < taskSet.length; ++i)
    {
        if(taskSet[i].isLocal)
        {
            localSet.push(taskSet[i]);
        }
        else
        {
            cloudSet.push(taskSet[i]);
        }

    }// End of for(i=0; i < taskSet.lenght; ++i)

    saveLocalData(localSet, "doWhut-Active");
    saveCloudData(cloudSet);

    while(localSet.length > 0)
    {
        localSet.pop();
    }

    while(cloudSet.length > 0)
    {
        cloudSet.pop();
    }

    for(i=0; i < arcSet.length; ++i)
    {
        if(arcSet[i].isLocal)
        {
            localSet.push(arcSet[i]);
        }
        else
        {
            cloudSet.push(arcSet[i]);
        }

    }// End of for(i=0; i < taskSet.lenght; ++i)

    saveLocalData(localSet, "doWhut-Archive");
    saveCloudData(cloudSet);


}; // End of saveData()

let retrieveData = function()
{
    retrieveLocalData(taskSet, "doWhut-Active");
    retrieveLocalData(arcSet, "doWhut-Archive");
    retrieveCloudData();

}; // End of retrieveData()

let showTask = function(task)
{

}; // End of showTask

let tableMouseOver = function(event) 
{
    $(this).css("cursor", "pointer");
};

let arcLocalClick = function(event)
{

    
    let localBtn = document.getElementById("arc-local");
    

    if(localBtn.getAttribute("data-state") === "unchecked")
    {
        localBtn.checked = true;
        localBtn.setAttribute("data-state", "checked");
    }

    else    
    {
        localBtn.checked = false;
        localBtn.setAttribute("data-state", "unchecked");
    }

    
}; // End of arcLocalClick()

let ceLocalClick = function(event)
{

    let localBtn = document.getElementById("ce-local");

    if(localBtn.getAttribute("data-state") === "unchecked")
    {
        localBtn.checked = true;
        localBtn.setAttribute("data-state", "checked");
    }

    else    
    {
        localBtn.checked = false;
        localBtn.setAttribute("data-state", "unchecked");
    }

	
};

let iUnderstandBtn = function()
{
    // Get the local storage raw data
    //let localStorageData = localStorage.getItem("doWhut-Active");

    //Get the passPhrasees from the splash screen
    
    let passPhrase1 = document.getElementById("passphrase1").value;
    let passPhrase2 = document.getElementById("passphrase2").value;

    // ToDo:  What if the pass phrases do NOT match
    passPhrase = passPhrase1;

    retrieveData();

    updateTable();
    updateArcTable();
    
}; // End of iUnderstandBtn()

    
let submitPassPhraseBtn = function(event)
{

};

let tableRowClickHandler = function(event)
{
   
    logSet(taskSet);
    logSet(arcSet);
  
    var clickedCell = $(event.target).closest("td");
    let nameInTable = clickedCell.text();

 
    currentTask = getTaskObject(nameInTable,taskSet);
   
    if(currentTask != -1)
    {
        $('#myUrgency').val(currentTask.urgency);
        $('#myImportance').val(currentTask.importance);
        $('#myEffort').val(currentTask.effort);
        $('#myCompletion').val(currentTask.completion);
        $('#myPriority').val(currentTask.priority);
        $('#task-area').val(currentTask.activityLog);
        $('#usr').val(currentTask.taskName);

        let localBtn = document.getElementById("ce-local");
        if(currentTask.isLocal === true)
        {
            localBtn.checked = true;
            localBtn.setAttribute("data-state", "checked");
        }
        else
        {
            localBtn.checked = false;
            letlocalBtn.setAttribute("data-state", "unchecked");
        }
   
        $(".itemHeader").html(currentTask.taskName + " activity log:");
    }

  
    arcTask = getTaskObject(nameInTable,arcSet);
     if(arcTask != -1)
    {
        $('#arcUrgency').val(arcTask.urgency);
        $('#arcImportance').val(arcTask.importance);
        $('#arcEffort').val(arcTask.effort);
        $('#arcCompletion').val(arcTask.completion);
        $('#arcPriority').val(arcTask.priority);
        $('#arc-task-area').val(arcTask.activityLog);
        $('#arc-usr').val(arcTask.taskName);

        let localBtn = document.getElementById("arc-local");
        if(arcTask.isLocal === true)
        {
            localBtn.checked = true;
            localBtn.setAttribute("data-state", "checked");
        }
        else
        {
            localBtn.checked = false;
            letlocalBtn.setAttribute("data-state", "unchecked");
        }
   
        $(".arcItemHeader").html(currentTask.taskName + " activity log:");
    }

};

let taskHasName = function(task, incomingName)
{
    let retValue = false;
    if(task.taskName === incomingName )
    {
        retValue = true;
    }

    return retValue;
};

let doesTaskExist = function(incomingTaskName)
{
    let i=0;
    let returnValue=false;
    for(i=0; i< taskSet.length; ++i)
    {
        if(taskHasName(taskSet[i],incomingTaskName))
        {
            returnValue = true;
        }
    }

    return returnValue;

}; // End of doesTaskExist()


let searchButtonHandler = function(event)
{

}; // End of searchButtonHandler()

let doneButtonHandler = function(event)
{
  
    arcSet.push(currentTask);
    let index = getTaskObjectIndex(currentTask.taskName, taskSet);
    taskSet.splice(index,1);
    saveData();
     updateTable();
     updateArcTable();
    $('#task-area').val("");
    $(".itemHeader").html("Activity log:");

 


}; // End of doneButtonHandler()

let deleteButtonHandler = function(event)
{
    let index = getTaskObjectIndex(currentTask.taskName, taskSet);
    taskSet.splice(index,1);

    saveData();
    updateTable();
    $('#task-area').val("");
    $(".itemHeader").html("Activity log:");
    

}; // End of deleteButtonHandler()



let saveButtonHandler = function(event)
{

    currentTask.urgency = $('#myUrgency').val();
    currentTask.importance = $('#myImportance').val();
    currentTask.effort = $('#myEffort').val();
    currentTask.completion = $('#myCompletion').val();

    let localBtn = document.getElementById("ce-local");
    
    if(localBtn.getAttribute("data-state") === "unchecked")
    {
        currentTask.isLocal = false;
    }
    else
    {
        currentTask.isLocal = true;
    }

    currentTask.priority = 200 * currentTask.urgency +
                           100 * currentTask.importance +
                           100* currentTask.completion +
                           150 * (100 - currentTask.effort);

    currentTask.activityLog = $('#task-area').val();
    currentTask.taskName = $('#usr').val();

    if(doesTaskExist(currentTask.taskName)=== false)
    {
       
        taskSet.push(currentTask);
        
    }    


    saveData();
    updateTable();

};

let newButtonHandler = function(event)
{
    let keepGoing = true;
   

    let newName = $("#usr").val();


    if(newName === "")
    {
        alert("There is no name for the new task!");
        keepGoing = false;
   } // End of if(newName === "")

   if(doesTaskExist(newName))
   {
        alert("A task named " + newName +
              " exists.  Task names must be unique.");
        keepGoing = false;
   }

   if(keepGoing)
   {
        let newTask = new Task(newName);
        currentTask = newTask;
        $(".itemHeader").html(currentTask.taskName + " activity log:");
        $('#task-area').val("");
        $('#myUrgency').val(50);
        $('#myImportance').val(50);
        $('#myCompletion').val(0);

        let localBtn = document.getElementById("ce-local");
    
        localBtn.checked = true;
        localBtn.setAttribute("data-state", "checked");
    

   }
};

/**
 * The displayPage function is the event listener for clicks
 * of the items in the navigation bar.  It chooses which of
 * the webpage's screens to display.
 * @param  {Object} event - The click event for members of the nav-bar.
 */
let displayPage = function(event)
{
	// Get handles to all the divs representing top level screensl
    let iNeed2_div = document.getElementById("iNeed2_screen"); 
    let settings_screen_div = document.getElementById("settings_screen");
    let cu_screen_div = document.getElementById("cu_screen");
    let archive_screen_div = document.getElementById("archive_screen");
    let br_screen_div = 
         document.getElementById("br_screen");
    let splash_div = document.getElementById("doWhut_splash_div");

    //taskList.encryptedDataSave();
  

    // Set the display of all the top level divs to "none"
    iNeed2_div.style.display = "none";
    settings_screen_div.style.display = "none";
    cu_screen_div.style.display = "none";
    archive_screen_div.style.display = "none";
    br_screen_div.style.display = "none";

    // Get the data-name of the object that was clicked
    let name = event.target.getAttribute("data-name");

    // Set the display of one of the top level divs to
    // "block" so that it will be seen.
    switch (name)
    {
    	case "iNeed2_screen":
     
            iNeed2Screen.initScreen();
            iNeed2_div.style.display = "block";
            break;

        case "settings_screen":
            SettingScreen.initScreen();
            settings_screen_div.style.display = "block";
            break;

        case "cu_screen":
            CreateUpdateScreen.initScreen();
            cu_screen_div.style.display = "block";
            break;

        case "archive_screen":
            ArchiveScreen.initScreen();
            archive_screen_div.style.display = "block";
            break;

        case "br_screen":
            BackupRestoreScreen.initScreen();
            br_screen_div.style.display = "block";
            break;

    } // End of switch (name)

}; // End of let displayPage = function(event)



let getTaskObject = function(incomingTaskName, dataSet)
{
    let i=0;
    let returnValue = -1;

    for(i=0; i< dataSet.length; ++i)
    {
        
        if(dataSet[i].taskName === incomingTaskName)
        {
            returnValue = dataSet[i];
        }
        
    }
    return returnValue;
};

let getTaskObjectIndex = function(incomingTaskName, dataSet)
{
    let i=0;
    let returnValue = -1;

    for(i=0; i< taskSet.length; ++i)
    {
        if(taskSet[i].taskName === incomingTaskName)
        {
            returnValue = i;
        }
        
    }
    return returnValue;
};

function quitSaveToLocalStorage()
{
    saveDataToLocalStorage(passPhrase);
}

function saveTextAsFile(textToSave)
{
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
   
 
    var downloadLink = document.createElement("a");

    downloadLink.download = getWebSiteName() + " data.bak";
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
};

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);

} // End of destroyClickedElement()

function backupDataToFile()
{
    let encryptedString = taskList.encryptedDataExport(passPhrase);
    saveTextAsFile(encryptedString);

} // End of backupDataToFile()

function processEncryptedStringFromFile()
{
    taskList.encryptedDataImport(restoreString, passPhrase);
}

function getEncryptedStringFromFile()
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

function restoreDataFromFile()
{
    getEncryptedStringFromFile();

} // End of restoreDataFromFile()

function saveDataToLocalStorage(passPhrase)
{
    let encryptedString = taskList.encryptedDataExport(passPhrase);
    setEncryptedStringInLocalStorage(encryptedString);

} // End of saveDataToLocalStorage()

function getDataFromLocalStorage()
{
    let encryptedString = getEncryptedStringFromLocalStorage();
    taskList.encryptedDataImport(encryptedString, passPhrase);

} // End of getDataFromLocalStorage()

function setEncryptedStringInLocalStorage(encryptedString)
{
    let storageKey = getWebSiteName();
    localStorage.setItem
    (
        storageKey, 
        encryptedString
    );

}

function getEncryptedStringFromLocalStorage()
{
    let storageKey = getWebSiteName();
    let encryptedString = localStorage.getItem(storageKey);
    return encryptedString;

}  // End of getEncryptedStringFromLocalStorage


function getWebSiteName()
{
    let retValue = "";
    let loc = window.location.pathname;
    let array = loc.split("/");
    let dir = array[array.length - 2];

    retValue = "4 " + dir + " iNeed2";

    return retValue;

} // End of getWebSiteName()

function nameWebSite()
{
    document.title = getWebSiteName();

} // End of nameWebSite()

function nameTaskList()
{
    taskList.setName(getWebSiteName());

} // End of nameTaskList()

// A $( document ).ready() block.
$( document ).ready(function() {

    console.log( "ready!" );

    /**************************************************
    *             Menu Bar Listeners                  *
    ***************************************************/                                                 
    // Adding click event listeners to all elements with a class of "nav-link"
    $(document).on("click", ".nav-link", displayPage);

    // Adding click event listeners to all elements 
    // with a class of "navbar-brand"
    $(document).on("click", ".navbar-brand", displayPage);


    /**************************************************
    *          Splash Screen Listeners              *
    ***************************************************/ 
    $('#spShowPassphrase').click(SettingScreen.ShowPassphraseClick);
    $('#spSubmitPassphrase').click(SettingScreen.SubmitPassphraseClick);


    /**************************************************
    *             Settings Listeners                  *
    ***************************************************/ 
    // Add Button Listeners
    $('#sShowPassphrase').click(SettingScreen.ShowPassphraseClick);
    $('#sSubmitPassphrase').click(SettingScreen.SubmitPassphraseClick);

    // Add Change Listeners
    $('#u_setting_input_l').change(SettingScreen.UrgencyWeightInputChange);
    $('#i_setting_input_l').change(SettingScreen.ImportanceWeightInputChange);
    $('#e_setting_input_l').change(SettingScreen.EffortWeightInputChange);
    $('#c_setting_input_l').change(SettingScreen.CompletionWeightInputChange);
    $('#myUrgency').change(SettingScreen.UrgencyWeightSliderChange);
    $('#myImportance').change(SettingScreen.ImportanceWeightSliderChange);
    $('#myEffort').change(SettingScreen.EffortWeightSliderChange);
    $('#myCompletion').change(SettingScreen.CompletionWeightSliderChange);


    /**************************************************
    *          Create / Update Listeners              *
    ***************************************************/ 
    // Add Button listeners
    CreateUpdateScreen.NewButton = $('#cuNewBtn');
    $('#cuNewBtn').click(CreateUpdateScreen.newClick);
    $('#cuArchiveBtn').click(CreateUpdateScreen.archiveClick);
    $('#cuDeleteBtn').click(CreateUpdateScreen.deleteClick);

    // Add Change Listeners
    $('#cuUrgencySlider').change(CreateUpdateScreen.urgencyChange);
    $('#cuImportanceSlider').change(CreateUpdateScreen.importanceChange);
    $('#cuEffortSlider').change(CreateUpdateScreen.effortChange);
    $('#cuCompletionSlider').change(CreateUpdateScreen.completionChange);
    $('#cu_task_area').change(CreateUpdateScreen.activityLogChange);

    // Add task table listeners
    $("#cu_task_table").mouseover(CreateUpdateScreen.mouseOverTable);
    $("#cu_task_table").click(CreateUpdateScreen.taskTableClick);

    $('#cu_task_area').keyup(CreateUpdateScreen.keyUp);
    

    /**************************************************
    *              Archive Listeners                  *
    ***************************************************/ 
    // Add task table listeners
    $("#arc_task_table").mouseover(ArchiveScreen.mouseOverTable);
    $("#arc_task_table").click(ArchiveScreen.taskTableClick);

    // Add Button Listeners
    $("#archive_DeleteBtn").click(ArchiveScreen.deleteClick);
    $("#archive_ActivateBtn").click(ArchiveScreen.reactivateClick);

    // Activity Log Listener
    $('#arc_task_area').keypress(ArchiveScreen.keypressClick);

    /**************************************************
    *        Backup / Retrieve Listeners              *
    ***************************************************/ 
    // Save / Retrieve
    $('#brSaveBtn').click(BackupRestoreScreen.saveClick);
    $('#brRetrieveBtn').click(BackupRestoreScreen.retrieveClick);

    //Backup / Restore
    $('#brBackupBtn').click(BackupRestoreScreen.backupClick);
    $('#brLoadBtn').click(BackupRestoreScreen.loadClick);
    $('#brProcessLoadedFile').click(BackupRestoreScreen.processClick);

    /**************************************************
    *          End of Register Listeners              *
    ***************************************************/ 



    nameWebSite();
    nameTaskList();
});

 