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
 * @classdesc The CreateUpdateScreen class (as an alternative to an ES6 module) 
 * is essentially a namespace for methods of the Create / Update screen.
 */
class CreateUpdateScreen
{
    constructor()
    {
       
    } // End of constructor()


    /**
     * initScreen() is the initializer for the create / update screen
     */
    static initScreen()
    {

    	
    	$("html").css("height", "100%)");
        $("body").css("color", "#202020");
        $("body").css("width", "100%");
        $("body").css("height", "100%");
        $("body").css("background-repeat", "no-repeat");
        $("body").css("background-size", "cover");
        $("body").css("background-image", "url('iNeed2_Resources/guy_working.jpeg')");

        if(CreateUpdateScreen.currentTask == null)
        {
          $('#cu_task_area').val("");
          $('#cuUrgencySlider').val(50);
          $('#cuImportanceSlider').val(50);
          $('#cuEffortSlider').val(50);
          $('#cuCompletionSlider').val(50);
        }
        else
        {
          $('#cuUrgencySlider').val(CreateUpdateScreen.currentTask.getUrgency());
          $('#cuImportanceSlider').val(CreateUpdateScreen.currentTask.getImportance());
          $('#cuEffortSlider').val(CreateUpdateScreen.currentTask.getEffort());
          $('#cuCompletionSlider').val(CreateUpdateScreen.currentTask.getCompletion());
          $('#cu_task_area').val(CreateUpdateScreen.currentTask.getActivityLog());
        }

        this.updateTable();
    	
    } // End of initScreen()

    /**************************************************
     *             Task Table Methods                 *
     **************************************************/

    /**
     * taskTableClick() is the event handler for clicking in the task table.
     * This method sets the element clicked on to be the selected task by
     * setting CreateUpdateScreen.currentTask equal to the task that was clicked.
     * This method then sets the slider values of the Create / Update screen to be
     * equal to the newly selected current task.  Finally, this method calls
     * CreateUpdateScreen.updateTable() so that the task that was clicked will have
     * a gray background.
     */
    static taskTableClick(event) 
    {
        // Get the name of the item
        var clickedCell = $(event.target).closest("td");
        let nameInTable = clickedCell.text();
    
        let currentTask = taskList.getTaskNamed(nameInTable);
        
        currentTask = taskList.getTaskNamed(nameInTable);

        if(currentTask != null)   
        {
            CreateUpdateScreen.currentTask = currentTask;

        }

        // Update the sliders and Activity Log for the newly
        // selected task
        $('#cuUrgencySlider').val(CreateUpdateScreen.currentTask.getUrgency());
        $('#cuImportanceSlider').val(CreateUpdateScreen.currentTask.getImportance());
        $('#cuEffortSlider').val(CreateUpdateScreen.currentTask.getEffort());
        $('#cuCompletionSlider').val(CreateUpdateScreen.currentTask.getCompletion());
        $('#cu_task_area').val(CreateUpdateScreen.currentTask.getActivityLog());

        CreateUpdateScreen.updateTable();
        
    } // End of taskTableClick()


    /**
     * updateTable() updates the task table of the Create / Update Screen.
     * This method filters the tasks in the task list so that
     * only tasks that return false from the "getArchived()" method will be
     * displayed.  If there has been a click event in the table, then the variable,
     * CreateUpdateScreen.currentTask will be defined.  When this task is
     * added to the table, the class, "selected" is added to the table
     * td element definition.  This will cause the selected task to have
     * a gray background in the table.
     */
    static updateTable() 
    {
        let i = 0;
        let taskListLength = taskList.getNumberOfTasks();
        let doneAdded = false;

        //taskList.encryptedDataSave();
        
        // First Clear the table of the stale values
        $('#cu_task_table').empty();

        taskList.sort();

        // Write the new data into the table
        for(i = 0; i < taskListLength; ++i)
        {
             let decoration = "";

            let task = taskList.getTask(i);


            /**
             * ToDo:  Review the logic of the following if block of code.
             * It works correctly, but its cyclomatic complexity is too high
             * for me to feel comfortable with it.
             */
            if( (task != undefined) && (task.getArchived() === false) )
            {
                if(CreateUpdateScreen.currentTask != null)
                {
                    if(task === CreateUpdateScreen.currentTask)
                    {
                      if(task.getCompletion() == 100)
                      {
                        decoration += " class = \"selected done\" ";
                      }
                      else
                      {
                        decoration += " class = \"selected\"";
                      }
                    }
                    else
                    {
                      if(task.getCompletion() == 100)
                      {
                        decoration += " class = \"done\"" ;
                      }
                      else
                      {
                        decoration = "";
                      }
                    }
                  }
                  else
                  {
                    if(task.getCompletion() == 100)
                      {
                        decoration += " class = \"done\"" ;
                      }
                  }

                $('#cu_task_table').append("<tr><td " + decoration + ">" +
                    task.getName() +
                    "</td></tr>)");

            }

    } // End of for(i=0; i<taskSet.length; ++i)

} // End of updateTable()


    /**
     * mouseOverTable() changes the cursor to be a hand to draw attention to
     * the fact that the user can click on a task in the task table.
     */
    static mouseOverTable(event)
    {
        $(this).css("cursor", "pointer");
    }

    /**************************************************
     *             Button Listeners                   *
     **************************************************/ 
    /**
     * newClick() is the event handler for New button click events.  If the
     * name input field is empty, then a modal will be presented saying that
     * new tasks much have a name.  If there is already a task with the name
     * present in the name input field, then a modal will be presented saying
     * that task names must be unique.  If the task name is present and there
     * is no existing task with the chosen task name, then a new task will be
     * added to the task table, and the new task will become the selected task
     * in the task table.
     */
    static newClick(event)
    {
        // Get the name from the name text input field
        let name = $('#cuNameField').val();
        if(name === "")
        {
          alert("Tasks must have a name.");
        }
        else if( ( name.includes('<') ) ||
                 ( name.includes('/') ) ||
                 ( name.includes('>') ) ||
                 ( name.includes('&') ) ||
                 ( name.includes("&lt") ) ||
                 ( name.includes("&gt") ) )
        {
          alert("Task name has invalid characters.");
          $('#cuNameField').val("");
        } 
        else
        {

          let existingTask = taskList.getTaskNamed(name);

          if(existingTask == null)
          {

            let newTask = new Task(name);

            if(newTask != null)
            {
                taskList.addTaskToList(newTask);
                CreateUpdateScreen.currentTask = newTask;
                $('#cuUrgencySlider').val(CreateUpdateScreen.currentTask.getUrgency());
                $('#cuImportanceSlider').val(CreateUpdateScreen.currentTask.getImportance());
                $('#cuEffortSlider').val(CreateUpdateScreen.currentTask.getEffort());
                $('#cuCompletionSlider').val(CreateUpdateScreen.currentTask.getCompletion());
                $('#cu_task_area').val(CreateUpdateScreen.currentTask.getActivityLog());
            }

            CreateUpdateScreen.updateTable();
          }
          else
          {
            alert("Task already exits.  Task names must be unique.");
          }
        }

        $('#cuNameField').val("");

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

    } // End of newClick()


    /**
     * archiveClick() is the event handler for Archive button click events.  This
     * method changes the state of the currently selected task to "archived."  This 
     * means that the task disappears from the Create / Update screen's task table and is 
     * moved into the Archive screen's task table.
     */
    static archiveClick(event)
    {
        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setArchived(true);
            CreateUpdateScreen.currentTask = null;
        }

        CreateUpdateScreen.updateTable();
        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
    } // End of archiveClick()

    /**
     * deleteClick() is the event handler for Delete button click events.  This
     * method deletes the currently selected task from the task table.
     */
    static deleteClick(event)
    {
        if(CreateUpdateScreen.currentTask != null)
        {
            taskList.deleteTask(CreateUpdateScreen.currentTask);
            CreateUpdateScreen.currentTask = null;
        }
        CreateUpdateScreen.updateTable();

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

    } // End of deleteClick()


    /**************************************************
     *             Change Listeners                   *
     **************************************************/ 

     /**
      * urgencyChange() is the event handler for changes in the
      * urgency slider values.  If a task has been selected from
      * the task list table, then the currently selected task will
      * have its urgency value changed and the priorities of the
      * tasks in the task list will be recalculated.  If there is 
      * no currently selected task, then urgency cannot be changed.
      */
    static urgencyChange(event)
    {
        let urgency = $('#cuUrgencySlider').val();

        CreateUpdateScreen.updateTable();

        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setUrgency(urgency);
        }

        if(CreateUpdateScreen.currentTask == null)
        {
            $('#cuUrgencySlider').val(50);
        }

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
        CreateUpdateScreen.updateTable();

    } // End of urgencyChange()


    /**
     * importanceChange() is the event handler for changes in the
     * importance slider values.  If a task has been selected from
      * the task list table, then the currently selected task will
      * have its importance value changed and the priorities of the
      * tasks in the task list will be recalculated.   If there is 
      * no currently selected task, then importance cannot be changed.
     */
    static importanceChange(event)
    {
        let importance = $('#cuImportanceSlider').val();

        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setImportance(importance);
        }

        if(CreateUpdateScreen.currentTask == null)
        {
            $('#cuImportanceSlider').val(50);
        }

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
        CreateUpdateScreen.updateTable();
    
    } // End of importanceChange()


    /**
     * effortChange() is the event handler for changes in the
     * effort slider values.  If a task has been selected from
      * the task list table, then the currently selected task will
      * have its effort value changed and the priorities of the
      * tasks in the task list will be recalculated.   If there 
      * is no currently selected task, then effort cannot be changed.
     */
    static effortChange(event)
    {
        let effort = $('#cuEffortSlider').val();

        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setEffort(effort) ;
        }

        if(CreateUpdateScreen.currentTask == null)
        {
            $('#cuEffortSlider').val(50);

        }

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
        CreateUpdateScreen.updateTable();

    } // End of effortChange


    /**
     * completionChange() is the event handler for changes in the
     * completion slider values.  If a task has been selected from
      * the task list table, then the currently selected task will
      * have its completion value changed and the priorities of the
      * tasks in the task list will be recalculated.   If there 
      * is no currently selected task, then completion cannot be changed.
     */
    static completionChange(event)
    {
        let completion = $('#cuCompletionSlider').val();

        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setCompletion(completion);
        }

        if(CreateUpdateScreen.currentTask == null)
        {
            $('#cuCompletionSlider').val(50);
        }

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
        CreateUpdateScreen.updateTable();

    } // End of completionChange()


    /**
     * activityLogChange() is the event handler for changes in the
     * activity log.  If a task has been selected from
      * the task list table, then the currently selected task will
      * have its activity log changed. If there is no currently 
      * selected task, then nothing will be done.
     */
    static activityLogChange(event)
    {
        let activityLog = $('#cu_task_area').val();

        if(CreateUpdateScreen.currentTask != null)
        {
            CreateUpdateScreen.currentTask.setActivityLog(activityLog);
        }

        if(CreateUpdateScreen.currentTask == null)
        {
            $('#cu_task_area').val("");
        }

        BackupRestoreScreen.saveDataToLocalStorage(passPhrase);
        
    } // End of activityLogChange()



    static keyUp(event)
    {
      let i = 0;
      let date = new Date();
      let displayString = "";
      let amOrPm = "";
      if(  (event.altKey === true) && (event.keyCode == 68) && (event.ctrlKey === true) )
      {
        event.preventDefault();

        displayString += nameString + " on ";
        let dayNumber = date.getDay();
        switch(dayNumber)
        {
          case 0:
            displayString += "Sun, ";
            break;
          case 1:
            displayString += "Mon, ";
            break;
          case 2:
            displayString += "Tue, ";
            break;
          case 3:
            displayString += "Wed, ";
            break;
          case 4:
            displayString += "Thu, ";
            break;
          case 5:
            displayString += "Fri, ";
            break;
          case 6:
            displayString += "Sat, ";
            break;
          
        } // End of switch
        displayString += date.getMonth()+1 + "/";
        displayString += date.getDate() + "/";
        displayString += date.getFullYear() + ", at ";
        let hour = date.getHours();
        if(hour <= 12)
        {
            displayString += hour + ":";
            amOrPm = "am";
        }
        else
        {
          displayString += hour-12 + ":";
            amOrPm = "pm";
        }
        displayString += date.getMinutes() + " ";
        
        displayString += amOrPm + ":";

        $('#cu_task_area').val($('#cu_task_area').val() + "\n" + displayString + "\n");

    }
    else if ( (event.altKey === true) && (event.keyCode == 84) && (event.ctrlKey === true))
    {
      $('#cu_task_area').val($('#cu_task_area').val() + "\n\n" +CreateUpdateScreen.currentTask.getPriority()  + "\n");
      
    }

  }
} // End of class CreateUpdateScreen

/**
 * currentTask is the currently selected task from the taskList object
 * @type {Object}
 */

CreateUpdateScreen.currentTask = null;
CreateUpdateScreen.debug = false;
//CreateUpdateScreen.NewButton = {};
