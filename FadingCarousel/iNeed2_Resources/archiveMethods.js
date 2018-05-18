/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
 /**
 * @file Contains the class definition of the CreateUpdateScreen class.  
 * @author Charles Roberts
 * @copyright Charles Roberts 2017
 */

/**
 * @classdesc The ArchiveScreen class (as an alternative to an ES6 module) is 
 * essentially a namespace for methods of the Archive screen.
 */
class ArchiveScreen
{
    /**
    * Function for initializing ArchiveScreen objects.  Because this class
    * is essentially used only to create a namespace, the constructor does nothing.
    */
	constructor() {}

    /**
     * initScreen() is the initializer for the ArchiveScreen
     */
	static initScreen()
	{
        $("body").css("width", "100%");
        $("body").css("height", "100%");
        $("body").css("background-repeat", "no-repeat");
        $("body").css("background-size", "cover");
        $("body").css("background-image", "url('iNeed2_Resources/filing_cabinets_5.jpg')");
		ArchiveScreen.updateTable();
        if( ArchiveScreen.currentTask == null)
        {
    		$('#arcUrgency').val(50);
            $('#arcImportance').val(50);
            $('#arcEffort').val(50);
            $('#arcCompletion').val(50);
            $('#arc_task_area').val("");
        }
        else
        {
            $('#arcUrgency').val(ArchiveScreen.currentTask.getUrgency());
            $('#arcImportance').val(ArchiveScreen.currentTask.getImportance());
            $('#arcEffort').val(ArchiveScreen.currentTask.getEffort());
            $('#arcCompletion').val(ArchiveScreen.currentTask.getCompletion());
            $('#arc_task_area').val(ArchiveScreen.currentTask.getActivityLog());
        }
	}


	/**************************************************
     *             Task Table Methods                 *
     **************************************************/

    /**
     * updateTable() updates the task table of the Archive Screen.
     * This method filters the tasks in the task list so that
     * only tasks that return true from the "getArchived()" method will be
     * displayed.  If there has been a click event in the table, then the variable,
     * ArchiveScreen.currentTask will be defined.  When this task is
     * added to the table, the class, "selected" is added to the table
     * td element definition.  This will cause the selected task to have
     * a gray background in the table.
     */
	static updateTable() 
    {
        let i = 0;
        let taskListLength = taskList.getNumberOfTasks();
        
        // First Clear the table of the stale values
        $('#arc_task_table').empty();

        taskList.sort();

        // Write the new data into the table
        for(i = 0; i < taskListLength; ++i)
        {
             let decoration = "";

            let task = taskList.getTask(i);

            if( (task != undefined) && (task.getArchived() === true) )
            {

                if(ArchiveScreen.currentTask != null)
                {
                    if(task === ArchiveScreen.currentTask)
                    {
                        decoration += "class = \"selected\" ";
                    }
                }

                $('#arc_task_table').append("<tr><td " + decoration + ">" +
                    task.getName() +
                    "</td></tr>)");
            }

    	} // End of for(i=0; i<taskSet.length; ++i)

	} // End of updateTable()


    /**
     * taskTableClick() is the event handler for clicking in the task table.
     * This method sets the element clicked on to be the selected task by
     * setting ArchiveScreen.currentTask equal to the task that was clicked.
     * This method then sets the slider values of the Archive screen to be
     * equal to the newly selected current task.  Finally, this method calls
     * ArchiveScreen.updateTable() so that the task that was clicked will have
     * a gray background.
     */
	static taskTableClick(event) 
    {
        // Get the name of the item
        var clickedCell = $(event.target).closest("td");
        let nameInTable = clickedCell.text();

        let currentTask = taskList.getTaskNamed(nameInTable);
        if(currentTask != null)   
        {
            ArchiveScreen.currentTask = currentTask;
            
            // Update the sliders and Activity Log for the newly
            // selected task
            $('#arcUrgency').val(ArchiveScreen.currentTask.getUrgency());
            $('#arcImportance').val(ArchiveScreen.currentTask.getImportance());
            $('#arcEffort').val(ArchiveScreen.currentTask.getEffort());
            $('#arcCompletion').val(ArchiveScreen.currentTask.getCompletion());
            $('#arc_task_area').val(ArchiveScreen.currentTask.getActivityLog());
        }

        ArchiveScreen.updateTable();
        
    } // End of taskTableClick()


    /**
     * mouseOverTable() changes the cursor to be a hand to draw attention to
     * the fact that the user can click on a task in the task table.
     */
    static mouseOverTable(event)
    {
        $(this).css("cursor", "pointer");
    }



    /**************************************************
     *             Button Click Methods               *
     **************************************************/

    /**
     * deleteClick() is the event handler for Delete button click events.  This
     * method deletes the currently selected task from the task table.
     */
    static deleteClick(event)
    {
        if(ArchiveScreen.currentTask != null)
        {
            taskList.deleteTask(ArchiveScreen.currentTask);
            ArchiveScreen.currentTask = null;
        }

        ArchiveScreen.updateTable();

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

    } // End of deleteClick()

    
    /**
     * reactivateClick() is the event handler for Reactivate button click events.  This
     * method changes the state of the currently selected task from "archived."  This 
     * means that the task disappears from the Archive screen's task table and is 
     * moved into the Create / Update screen's task table.
     */
    static reactivateClick(event)
    {
        if (ArchiveScreen.currentTask != null)
        {
            ArchiveScreen.currentTask.setArchived(false);
            ArchiveScreen.updateTable();

            BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

        }
    } // End of reactivateClick()


    /**
     * keypressClick() is the event handler for click events of the 
     * Activity Log in the Archive screen.  By preventing default behavior,
     * the contents of the Activity Log can be viewed but not changed.
     */
    static keypressClick(event)
    {
        event.preventDefault();
        
    } // End of keypressClick()



} // End of class ArchiveScreen

/**
 * ArchiveScreen.currentTask is the currently selected task in the
 * Archive screen
 * @type {Object}
 */
ArchiveScreen.currentTask = null;
