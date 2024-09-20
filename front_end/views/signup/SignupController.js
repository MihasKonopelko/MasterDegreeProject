/**Controller for sign up**/
class SignupController
{
	constructor(model)
	{
		this.model = model;
		this.setup();
	}

	setup()
	{
		var that = this;

		var signupButton = document.getElementById("signup-button");

		signupButton.addEventListener("click", function(){that.signup()} );
	}

	signup(e)
	{
		var email = document.getElementById("signup-email").value;
		var name = document.getElementById("signup-name").value;
    	var surname = document.getElementById("signup-surname").value;
		var noun = document.getElementById("signup-noun").value;
		var password = document.getElementById("signup-password").value;
		var passwordConfirm = document.getElementById("signup-confirm-password").value;
        var teamName = document.getElementById("signup-group").value;



		if (email !== "" && teamName !== "" && name !== "" && surname !== "" && noun !== "" && password !== "" && passwordConfirm !== "")
		{
			if (password === passwordConfirm)
			{
			    if (password.length < 8 )
                {
                     this.showError("Please select a longer password");
                }

                else
                {
                    if (email.indexOf("@itcarlow.ie") !== -1)
                    {
                        this.model.signup(email, teamName, name, surname, noun, password);
                        this.cleanSignup();
                    }
                    else
                    {
                        this.showError("Please use an @itcarlow.ie email");
                    }
                }
			}

			else
			{
				this.showError("Passwords do not match!");
			}
		}
		else
		{
			this.showError("You did not fill out everything!");
		}



	}


	cleanSignup()
	{
		// Clean values
		document.getElementById("signup-email").value = "";
		document.getElementById("signup-name").value = "";
		document.getElementById("signup-surname").value = "";
		document.getElementById("signup-noun").value = "";
		document.getElementById("signup-password").value = "";
		document.getElementById("signup-confirm-password").value = "";
	}

	showError(errMessage)
	{
		document.getElementById("signup-error").innerHTML = errMessage;
	}


}
