/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/

let taskList   = new TaskList(); 
var passPhrase = "Little Miss Muffet sat on a tuffet";
let nameString = "";

/**
 * @todo I don't think this should be here.  There is one in the 
 * backup / restore namespace, and that one should be the one that
 * is used by the webpage.
 */
let restoreString = "";



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

 