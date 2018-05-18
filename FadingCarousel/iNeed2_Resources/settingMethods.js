/***********************************************************************
 * Copyright (c) 2018 Charles W. Roberts
 * All Rights Reserved
 *
 * No portion of this code may be copied or modified without the
 * prior written permission of Charles Roberts.
 *
 ***********************************************************************/
 /**
 * @file Contains the class definition of the SettingScreen class.  
 * @author Charles Roberts
 * @copyright Charles Roberts 2017
 */

/**
 * @classdesc The CreateUpdateScreen is essentially a namespace for
 * methods of the Settings screen.
 */
class SettingScreen
{
	constructor()
	{
	}

	/**
     * initScreen() is the initializer for the settings screen
     */
	static initScreen()
	{
		// Some css appearance items
		$("html").css("height", "100%)");
	    $("body").css("color", "#d0d0d0");
	    $("body").css("width", "100%");
	    $("body").css("height", "100%");
	     $('.Copyright a').css("color", "white"); 
	    $('.Copyright a:visited').css("color", "white"); 
	    $('.Copyright p').css("color", "white"); 

	    $("body").css("background-repeat", "no-repeat");
	    $("body").css("background-size", "cover");
	    $("body").css("background-image", "url('iNeed2_Resources/control_panel_1b.jpeg')");

	    // Set Input Field Weight values
	    $('#u_setting_input_l').val(taskList.getUrgencyWeight());
	    $('#i_setting_input_l').val(taskList.getImportanceWeight());
	    $('#e_setting_input_l').val(taskList.getEffortWeight());
	    $('#c_setting_input_l').val(taskList.getCompletionWeight());

	    // Set Slider Weight values
	    $('#myUrgency').val(taskList.getUrgencyWeight());
	    $('#myImportance').val(taskList.getImportanceWeight());
	    $('#myEffort').val(taskList.getEffortWeight());
	    $('#myCompletion').val(taskList.getCompletionWeight());
	}

	/**************************************************
     *             Button Listeners                   *
     **************************************************/ 
	static ShowPassphraseClick(event)
	{
		let btnID = event.target.id;
	    let btnElement = document.getElementById(btnID);
	    let state = btnElement.getAttribute("data-state");
	    if(state === "hidden")
	    {
	        btnElement.setAttribute("data-state", "clear");
	        btnElement.classList.remove('hidden-state');
	        btnElement.classList.add('clear-state');
	        SettingScreen.showPassword();

	    }
	    else if (state === "clear")
	    {
	        btnElement.setAttribute("data-state", "hidden");
	        btnElement.classList.remove('clear-state');
	        btnElement.classList.add('hidden-state-state');
	        SettingScreen.hidePassword();
	    }
	    else
	    {
	        alert("password state is incorrect.");
	    }
	}



	static SubmitPassphraseClick(event)
	{
		let phrase1 = $('#sPassphrase1Field1').val();
		let phrase2 = $('#sPassphrase2Field2').val();
		let phrase3 = $('#spPassphrase1Field1').val();
		let phrase4 = $('#spPassphrase2Field2').val();
		

		if( (  (phrase1 !== "") && (phrase1 != null) && (phrase1 != undefined) && 
			   (phrase2 !== "") && (phrase2 != null) && (phrase2 != undefined) && (phrase1 === phrase2)  ) || 
			(  (phrase3 !== "") && (phrase3 != null) && (phrase3 != undefined) && 
				(phrase4 !== "") && (phrase4 != null) && (phrase4 != undefined) && (phrase3 === phrase4)  ))
		{
			if( (phrase1 != "") && (phrase1 != null) && (phrase1 != undefined) )
			{
				passPhrase = phrase1;
				nameString = $('#spname').val();
			}
			else if( (phrase3 != "") && (phrase3 != null) && (phrase3 != undefined) )
			{
				passPhrase = phrase3;
				nameString = $('#spname').val();
			}
			
			
			$(".cwr").css("display", "none");

			BackupRestoreScreen.getDataFromLocalStorage();

		}
		else
		{
			// Get the modal
		    var modal = document.getElementById('passwordMismatchModal');

		    // Get the <span> element that closes the modal
		    var span = document.getElementsByClassName("close")[0];

		    modal.style.display = "block";

		    // When the user clicks on <span> (x), close the modal
		    span.onclick = function() 
		    {
		        modal.style.display = "none";
		    };

		    // When the user clicks anywhere outside of the modal, close it
		    window.onclick = function(event) 
		    {
		        if (event.target == modal) 
		        {
		            modal.style.display = "none";
		        }
		    };
		}

	} // End of sSubmitPassphraseClick()

	/**************************************************
	 *             Change Listeners                   *
	 **************************************************/ 
	static UrgencyWeightInputChange(event)
	{
		let urgencyWeight = $('#u_setting_input_l').val();

		if(urgencyWeight > 100)
		{
			urgencyWeight = parseInt(100);
		}

		if(urgencyWeight < 0)
		{
			urgencyWeight = parseInt(0);
		}

		$('#u_setting_input_l').val(urgencyWeight);
		$('#myUrgency').val(urgencyWeight);

		// Save this to taskList
		taskList.setUrgencyWeight(urgencyWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	}

	static ImportanceWeightInputChange(event)
	{
		let importanceWeight = $('#i_setting_input_l').val();

		if(importanceWeight > 100)
		{
			importanceWeight = parseInt(100);
		}

		if(importanceWeight < 0)
		{
			importanceWeight = parseInt(0);
		}

		$('#i_setting_input_l').val(importanceWeight);
		$('#myImportance').val(importanceWeight);

		// Save the new importanceWeight to the taskList
		taskList.setImportanceWeight(importanceWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	}

	static EffortWeightInputChange(event)
	{
		let effortWeight = $('#e_setting_input_l').val();

		if(effortWeight > 100) 
		{
			effortWeight = parseInt(100);
		}

		if(effortWeight < -100)
		{
			effortWeight = parseInt(-100);
		}

		$('#e_setting_input_l').val(effortWeight);
		$('#myEffort').val(effortWeight);

		// Save the new effort weight to the taskList
		taskList.setEffortWeight(effortWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);


	}

	static CompletionWeightInputChange(event)
	{
		let completionWeight = $('#c_setting_input_l').val();

		if(completionWeight > 100)
		{
			completionWeight = parseInt(100);
		}

		if(completionWeight < -100)
		{
			completionWeight = parseInt(-100);
		}

		$('#c_setting_input_l').val(completionWeight);
		$('#myCompletion').val(completionWeight);

		// Save the new value of completion weight to the taskList
		taskList.setCompletionWeight(completionWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);


	}

	static UrgencyWeightSliderChange(event)
	{
		let urgencyWeight = $('#myUrgency').val();
		$('#u_setting_input_l').val(urgencyWeight);

		// Save the new value of urgency weight to taskList
		taskList.setUrgencyWeight(urgencyWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	}

	static ImportanceWeightSliderChange(event)
	{
		let importanceWeight = $('#myImportance').val();
		$('#i_setting_input_l').val(importanceWeight);

		// Save the new importance weight value to the taskList
		taskList.setImportanceWeight(importanceWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	}

	static EffortWeightSliderChange(event)
	{
		let effortWeight = $('#myEffort').val();
		$('#e_setting_input_l').val(effortWeight);

		// Save the new effort weight to the taskList
		taskList.setEffortWeight(effortWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);

	}


	static CompletionWeightSliderChange(event)
	{
		let completionWeight = $('#myCompletion').val();
		$('#c_setting_input_l').val(completionWeight);

		// Save the new value of completion weight to the taskList
		taskList.setCompletionWeight(completionWeight);

		BackupRestoreScreen.saveDataToLocalStorage(passPhrase);


	}

	/**************************************************
	 *             Helper Functions                   *
	 **************************************************/ 
	static showPassword()
	{
	    $(".passphrase").each(function(index,input) 
	    {   
	        var $input = $(input);
	        var rep = $("<input type='text' />");
	        rep.attr("id", $input.attr("id"));
	        rep.attr("name", $input.attr("name"));
	        rep.attr('class', $input.attr('class'));
	        rep.val($input.val());
	        rep.insertBefore($input);
	        $input.remove();
	        $input = rep;
	    });

	} // End of showPassword()

	static hidePassword()
	{
	    $(".passphrase").each(function(index,input) 
	    {
	        var $input = $(input); 
	        var rep = $("<input type='password' />");
	        rep.attr("id", $input.attr("id"));
	        rep.attr("name", $input.attr("name"));
	        rep.attr('class', $input.attr('class'));
	        rep.val($input.val());
	        rep.insertBefore($input);
	        $input.remove();
	        $input = rep;
	    });


	} // End of hidePassword()

}

//SettingScreen.urgencyWeight    = parseInt(100); // Between 0 and 100
//SettingScreen.importanceWeight = parseInt(75);  // Between 0 and 100
//SettingScreen.effortWeight     = parseInt(-35); // Between -100 and +100
//SettingScreen.completionWeight = parseInt(35);  // Between -100 and +100



