/*Create a namespace for your company or organization. This helps to avoid conflicts caused by global variables*/
irise.namespace("freeSpirit");
/*Change "widgetTemplate" to your iBloc name */
freeSpirit.loginAction = function() {};

/*This function can be considered as entry point for the iBloc. */
freeSpirit.loginAction.prototype.onload = function()
{
	try
  {
		this.action();
	}
  catch(e)
  {
		alert("Some error occurred, contact the developer, appologies !  Error Message: "+e.message);
		irise.log(e.message);
	}
}
//this function gets properties from the iBloc to construct the alert button
freeSpirit.loginAction.prototype.action = function()
{
	//retrieve iBloc properties using "getProperty" and define variables
  var currentWidget = this;
  var useCustomHtml = this.getProperty("useCustomHtml");
	var validUsernames = this.getProperty("validUsernames");
	var validPasswords = this.getProperty("validPasswords");
	var inputUsername = this.getProperty("InputUsername");
	var inputPassword = this.getProperty("InputPassword");
  var widgetDiv = this.getWidgetDiv();
	var emptyData=false;
	var matched = false;

	if(useCustomHtml==null || useCustomHtml=='undefined' || useCustomHtml=='')
	{
		useCustomHtml=false;
	}
  //	that.sendEvent('onAlert');	var alertVal = confirm(alertMsg);

	if(validUsernames!=null && validUsernames!='undefined' && validUsernames!="" && validPasswords!=null && validPasswords!='undefined' && validPasswords!="" && validPasswords.length!=0 && validUsernames.length!=0 && validUsernames.length==validPasswords.length)
	{
			//Validation code starts here
		  if(useCustomHtml) //let user do the html part
		  {
				var customHtml = this.getProperty("customHtml");

				if(inputUsername==null || inputUsername=='undefined')
				{
					inputUsername="";
				}

				if(inputPassword==null || inputPassword=='undefined')
				{
					inputPassword="";
				}

				widgetDiv.html(customHtml);
				var button=$('#loginButton');
				button.live('click',function()
				{
					var len=validUsernames.length;
					var usernameFromInput=$('#username').val();
					var passwordFromInput=$('#password').val();
					currentWidget.setProperty("InputUsername",usernameFromInput);
					currentWidget.setProperty("InputPassword",passwordFromInput);

					if(usernameFromInput==null || usernameFromInput=='undefined' || usernameFromInput=='' || passwordFromInput==null || passwordFromInput=='undefined' || passwordFromInput=='')
					{
							currentWidget.sendEvent("onEmptyUsernameOrPassword");
							return true;
					}
					else /** start matching the passwords and usernames **/
					{
						for(var index=0;index<=len;index++)
						{
							var usernameFromDataSheet=validUsernames[index];
							var passwordFromDataSheet=validPasswords[index];
							if(usernameFromDataSheet==usernameFromInput && passwordFromDataSheet==passwordFromInput)
							{
								currentWidget.sendEvent("onLoginSuccess");
								return true;
							}
						}
								currentWidget.sendEvent("onLoginFail");
								return true;
					}

					});


		  }
		  else //use predefined html
		  {

			var buttonLabel = this.getProperty("buttonLabel");
			if(inputUsername==null || inputUsername=='undefined')
			{
				inputUsername="";
			}
			if(inputPassword==null || inputPassword=='undefined')
			{
				inputPassword="";
			}

			var htmlToRender = "Username : <input type='text' id='username' value='"+inputUsername+"'/><br><br>Password : <input type='password' id='password' value='"+inputPassword+"'/><br><input type='button' id='loginButton' value='"+buttonLabel+"'/>";
			widgetDiv.html(htmlToRender);
			var button=$('#loginButton');
			button.live('click',function()
			{
			  var len=validUsernames.length;
			  var usernameFromInput=$('#username').val();
			  var passwordFromInput=$('#password').val();
				currentWidget.setProperty("InputUsername",usernameFromInput);
				currentWidget.setProperty("InputPassword",passwordFromInput);

			  if(usernameFromInput==null || usernameFromInput=='undefined' || usernameFromInput=='' || passwordFromInput==null || passwordFromInput=='undefined' || passwordFromInput=='')
			  {
						currentWidget.sendEvent("onEmptyUsernameOrPassword");
						return true;
			  }
				else /** start matching the passwords and usernames **/
				{
					for(var index=0;index<=len;index++)
					{
						var usernameFromDataSheet=validUsernames[index];
						var passwordFromDataSheet=validPasswords[index];
						if(usernameFromDataSheet==usernameFromInput && passwordFromDataSheet==passwordFromInput)
						{
							currentWidget.sendEvent("onLoginSuccess");
							return true;
						}
					}
							currentWidget.sendEvent("onLoginFail");
							return true;
				}

				});
			}

			}
			else {
				alert("Usernames/Passwords cannot be empty and must be of equal numbers.");
				return false;
			}
		//Validation code ends here
	}
