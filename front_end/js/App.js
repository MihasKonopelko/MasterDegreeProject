var app;


function main()
{
	app = new App();
}

class App
{
 	constructor()
 	{
		this.net = new Net();
		this.urlChecker = new URLChecker();

		this.audioManager = new AudioManager();

		this.viewManager= new ViewManager();
		this.templateManager = new TemplateManager();
		this.modalContentManager = new ModalContentManager();
		this.utils = new Utilities();
		this.annalist =  new Annalist(this.net);

		//load views
		for (var viewName in this.viewManager.VIEW)
		{
			this.templateManager.queueTemplate(this.viewManager.VIEW[viewName]);
		}

		//load resources
		this.loadResources();
		this.audioManager.downloadAll(function() {
			app.templateManager.downloadAll(function()	{
				app.modalContentManager.downloadAll(function () {
					app.setup();
					window.addEventListener('beforeunload', function() {
						app.annalist.sendAndClearLogs(true);
					});
					app.annalist.updateTracks();

		});});});
	}

	heartbeat()
	{
		app.net.sendMessage("heartbeat", {});
	}

	setup()
	{
		this.templateManager.loadFromCache();

		//models
		this.user = new User();
		this.assignments = new Assignments();
		this.submissions = new Submissions();
		this.standards = new Standards();
		this.challenge = new Challenge();
		this.students = new Students();

		this.net.setHost(location.hostname, 80);
		this.net.connect();

		this.urlChecker.setHost(location.hostname, 80);

		this.setupViews();
        this.viewManager.goToView("signin");


        // Detects keypresses and tries to pass them to a current view
        document.addEventListener("keydown", function (e) {
            try {
                app.viewManager.currentView.controller.onKeyPress(e.code);
            } catch {

            }
        }, false);
	}


	setupViews()
	{
		var signinController = new SigninController(this.user);
		var signinView = new SigninView(signinController);
		this.viewManager.addView(signinView);

		var signupController = new SignupController(this.user);
		var signupView = new SignupView( signupController);
		this.viewManager.addView(signupView);

		var profileController = new ProfileController(this.user);
		var profileView = new ProfileView(profileController);
		this.viewManager.addView(profileView);

		var assignmentsTeacherController = new AssignmentsTeacherController(this.assignments);
		var assignmentsTeacherView = new AssignmentsTeacherView( assignmentsTeacherController);
		this.viewManager.addView(assignmentsTeacherView);

		var assignmentsStudentController = new AssignmentsStudentController(this.assignments);
		var assignmentsStudentView = new AssignmentsStudentView(assignmentsStudentController);
		this.viewManager.addView(assignmentsStudentView);

		var feedbackController = new FeedbackController(this.submissions);
		var feedbackView = new FeedbackView(feedbackController);
		this.viewManager.addView(feedbackView);

		var performReviewController = new PerformReviewStudentController(this.submissions);
		var performReviewView = new PerformReviewStudentView(performReviewController);
		this.viewManager.addView(performReviewView);

		var seeStandardsStudentController = new SeeStandardsStudentController(this.standards);
		var seeStandardsStudentView = new SeeStandardsStudentView(seeStandardsStudentController);
		this.viewManager.addView(seeStandardsStudentView);

		var seeStandardsTeacherController = new SeeStandardsTeacherController(this.standards);
		var seeStandardsTeacherView = new SeeStandardsTeacherView(seeStandardsTeacherController);
		this.viewManager.addView(seeStandardsTeacherView);

		var seeSubmissionsStudentController = new SeeSubmissionsStudentController(this.submissions);
		var seeSubmissionsStudentView = new SeeSubmissionsStudentView(seeSubmissionsStudentController);
		this.viewManager.addView(seeSubmissionsStudentView);

		var seeSubmissionsTeacherController = new SeeSubmissionsTeacherController(this.submissions);
		var seeSubmissionsTeacherView = new SeeSubmissionsTeacherView(seeSubmissionsTeacherController);
		this.viewManager.addView(seeSubmissionsTeacherView);

		var codeViewController = new CodeViewController(this.submissions);
		var codeView = new CodeView(codeViewController);
		this.viewManager.addView(codeView);

		var createChallengeController = new CreateChallengeController(this.challenge);
		var createChallengeView = new CreateChallengeView(createChallengeController);
		this.viewManager.addView(createChallengeView);

		var challengeController = new ChallengeController(this.challenge);
		var challengeView = new ChallengeView(challengeController);
		this.viewManager.addView(challengeView);

		var manageSystemsTeacherController = new ManageSystemsTeacherController(this.students);
		var manageSystemsTeacherView = new ManageSystemsTeacherView(manageSystemsTeacherController);
		this.viewManager.addView(manageSystemsTeacherView);

		var studentSystemSelectController = new StudentSystemSelectController(this.user);
		var studentSystemSelectView = new StudentSystemSelectView(studentSystemSelectController);
		this.viewManager.addView(studentSystemSelectView);

		var changePasswordController = new ChangePasswordController(this.user);
		var changePasswordView = new ChangePasswordView(changePasswordController);
		this.viewManager.addView(changePasswordView);




		// KEEP ADDING OBSERVERS AS THEY ARE NEEDED

		// On entering a system, we need to store user info or notify user if he failed to enter the system
		this.user.addObserver(signinView, this.net.messageHandler.types.SIGN_IN_SUCCESSFUL);
		this.user.addObserver(signinView, this.net.messageHandler.types.SIGN_IN_FAILED);
		this.user.addObserver(signupView, this.net.messageHandler.types.SIGN_UP_SUCCESSFUL);
		this.user.addObserver(signupView, this.net.messageHandler.types.SIGN_UP_FAILED);
		this.user.addObserver(profileView, this.net.messageHandler.types.SIGN_IN_SUCCESSFUL);
		this.user.addObserver(studentSystemSelectView, this.net.messageHandler.types.SIGN_IN_SUCCESSFUL);

		this.user.addObserver(changePasswordView, this.net.messageHandler.types.CHANGE_PASSWORD_SUCCESSFUL);
		this.user.addObserver(changePasswordView, this.net.messageHandler.types.CHANGE_PASSWORD_FAILED);

		// Track standard loading
		this.user.addObserver(profileView, this.net.messageHandler.types.GET_STANDARD_SUCCESSFUL);


		// Teacher - Assignment
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.TEACHER_ASSIGNMENTS_CREATION_SUCCESSFUL);
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.TEACHER_ASSIGNMENTS_CREATION_FAILED);
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.GET_ASSIGNMENTS_SUCCESSFUL);
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.GET_ASSIGNMENTS_FAILED);
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.ASSIGNMENT_DELETE_SUCCESSFUL);
		this.assignments.addObserver(assignmentsTeacherView, this.net.messageHandler.types.ASSIGNMENT_DELETE_FAILED);

		// Student - Assignment
		this.assignments.addObserver(assignmentsStudentView, this.net.messageHandler.types.GET_ASSIGNMENTS_SUCCESSFUL);
		this.assignments.addObserver(assignmentsStudentView, this.net.messageHandler.types.ASSIGNMENT_DELETE_SUCCESSFUL);
		this.submissions.addObserver(assignmentsStudentView, this.net.messageHandler.types.SUBMIT_ASSIGNMENT_SUCCESSFUL);
		this.submissions.addObserver(assignmentsStudentView, this.net.messageHandler.types.GET_SUBMISSIONS_SUCCESSFUL);


		// Student - Submission
		this.submissions.addObserver(seeSubmissionsStudentView, this.net.messageHandler.types.SUBMIT_ASSIGNMENT_SUCCESSFUL);
		this.submissions.addObserver(seeSubmissionsStudentView, this.net.messageHandler.types.GET_SUBMISSIONS_SUCCESSFUL);
		this.submissions.addObserver(feedbackView, this.net.messageHandler.types.GET_SUBMISSIONS_SUCCESSFUL);


		// Teacher - Submission
		this.submissions.addObserver(seeSubmissionsTeacherView, this.net.messageHandler.types.SUBMIT_ASSIGNMENT_SUCCESSFUL);
		this.submissions.addObserver(seeSubmissionsTeacherView, this.net.messageHandler.types.GET_SUBMISSIONS_SUCCESSFUL);
		this.submissions.addObserver(seeSubmissionsTeacherView, this.net.messageHandler.types.SUBMIT_REVIEW_SUCCESSFUL);


		// Student - Reviews To Do
		this.submissions.addObserver(performReviewView, this.net.messageHandler.types.SUBMIT_ASSIGNMENT_SUCCESSFUL);
		this.submissions.addObserver(performReviewView, this.net.messageHandler.types.GET_SUBMISSIONS_SUCCESSFUL);
		this.submissions.addObserver(performReviewView, this.net.messageHandler.types.SUBMIT_REVIEW_SUCCESSFUL);


		// Teacher - Standards
		this.standards.addObserver(seeStandardsTeacherView, this.net.messageHandler.types.PUSH_STANDARD_SUCCESSFUL);
		this.standards.addObserver(seeStandardsTeacherView, this.net.messageHandler.types.GET_STANDARD_SUCCESSFUL);
		this.standards.addObserver(seeStandardsTeacherView, this.net.messageHandler.types.UPDATE_STANDARDS_CONFIG_SUCCESSFUL);

		// Student - Standards
		this.standards.addObserver(seeStandardsStudentView, this.net.messageHandler.types.GET_STANDARD_SUCCESSFUL);


		// Student - Challenge
		this.challenge.addObserver(challengeView, this.net.messageHandler.types.GET_CHALLENGE_SUCCESSFUL);
		this.user.addObserver(profileView, this.net.messageHandler.types.UPLOAD_CHALLENGE_RESULTS_SUCCESSFUL);

		// Teacher - Students interactions
		this.students.addObserver(manageSystemsTeacherView, this.net.messageHandler.types.GET_STUDENTS_SUCCESSFUL);
		this.students.addObserver(manageSystemsTeacherView, this.net.messageHandler.types.INVERT_SYSTEMS_SUCCESSFUL);
		this.students.addObserver(manageSystemsTeacherView, this.net.messageHandler.types.ENABLE_SYSTEM_SWITCH_SUCCESSFUL);
	}

	setupMenuPanel()
	{
		var viewLabel = document.getElementById("view-title");
		var gamified = app.user.gamified;
		var team = app.user.teamName;
		var challengeModeOnly = app.user.challengeModeOnly;

		if (gamified === "y")
		{
            app.utils.assignFuncToButtonViaID("mps-profile-button", function () {
                if (app.viewManager.currentView.title !== app.viewManager.VIEW.PROFILE) {
                    var doingChallenge = app.challenge.doingChallenge;

                    if(doingChallenge)
                    {
                        var r = confirm("You will lose progress if you leave now.  Sure?");
                        if (r)
                        {
                            app.challenge.doingChallenge = false;
                            app.annalist.saveForLogs("profile_visit", {});
                            app.annalist.saveForLogs("left_challenge", "");
                            app.viewManager.goToView(app.viewManager.VIEW.PROFILE);
                            viewLabel.innerText = "Your Profile";
                        }
                    }
                    else {
                        app.annalist.saveForLogs("profile_visit", {});
                        app.viewManager.goToView(app.viewManager.VIEW.PROFILE);
                        viewLabel.innerText = "Your Profile";
                    }
                }
            });
        }
        else if (gamified === "n")
		{
			document.getElementById("mps-profile-button").style.display = 'none';
			app.viewManager.goToView(app.viewManager.VIEW.SEE_STANDARDS_STUDENT);
			viewLabel.innerText = "Standards Available";
		}


		if (challengeModeOnly)
		{
		    document.getElementById("mps-assignments-button").style.display = 'none';
		    document.getElementById("mps-reviews-button").style.display = 'none';
		    document.getElementById("mps-feedback-button").style.display = 'none';
		    document.getElementById("mps-submissions-button").style.display = 'none';
        }

        if (team === "y4" || team === "y2"  || team === "y1a"  || team === "y1b" || team === "y2x") {
		    document.getElementById("mps-challenges-js-button").style.display = 'none';
        }

        if (team === "y3"  ) {
		    document.getElementById("mps-challenges-cpp-button").style.display = 'none';
        }
        


        app.utils.assignFuncToButtonViaID("mps-challenges-cpp-button", function () {
            if (app.viewManager.currentView.title !== app.viewManager.VIEW.CHALLENGE) {
                var doingChallenge = app.challenge.doingChallenge;
                if(doingChallenge) {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r)
                    {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
                        app.challenge.getChallengeChain("cpp");
                    }
                }
                else {
                    app.challenge.getChallengeChain("cpp");
                }


            }
        });

        app.utils.assignFuncToButtonViaID("mps-challenges-js-button", function () {
            if (app.viewManager.currentView.title !== app.viewManager.VIEW.CHALLENGE) {
                var doingChallenge = app.challenge.doingChallenge;
                if(doingChallenge)
                {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r)
                    {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
                        app.challenge.getChallengeChain("js");
                    }
               }
               else{
                    app.challenge.getChallengeChain("js");
                }
            }
        });

		app.utils.assignFuncToButtonViaID("mps-assignments-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.ASSIGNMENTS_STUDENT)
			{
			    var doingChallenge = app.challenge.doingChallenge;
			    if(doingChallenge) {
			        var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r){
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
                        app.viewManager.goToView(app.viewManager.VIEW.ASSIGNMENTS_STUDENT);
                        document.getElementById("view-title").innerText = "Assignments";
                    }
				}

				else {
			        app.viewManager.goToView(app.viewManager.VIEW.ASSIGNMENTS_STUDENT);
			        document.getElementById("view-title").innerText = "Assignments";
			    }
			}
		});

		app.utils.assignFuncToButtonViaID("mps-standards-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.SEE_STANDARDS_STUDENT)
			{
			    var doingChallenge = app.challenge.doingChallenge;
			    if(doingChallenge) {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r)
                    {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
                        app.viewManager.goToView(app.viewManager.VIEW.SEE_STANDARDS_STUDENT);
                        viewLabel.innerText = "Standards Available";
                    }

			    }
			    else {
			        app.viewManager.goToView(app.viewManager.VIEW.SEE_STANDARDS_STUDENT);
			        viewLabel.innerText = "Standards Available";
			    }
			}
		});

		app.utils.assignFuncToButtonViaID("mps-reviews-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.PERFORM_REVIEW_STUDENT)
			{
			    var doingChallenge = app.challenge.doingChallenge;
			    if(doingChallenge) {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r) {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
				        app.viewManager.goToView(app.viewManager.VIEW.PERFORM_REVIEW_STUDENT);
				        viewLabel.innerText = "Reviews To Do";
                    }

			    }
			    else {
			        app.viewManager.goToView(app.viewManager.VIEW.PERFORM_REVIEW_STUDENT);
			        viewLabel.innerText = "Reviews To Do";
			    }
			}
		});


		app.utils.assignFuncToButtonViaID("mps-feedback-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.FEEDBACK)
			{
			    var doingChallenge = app.challenge.doingChallenge;
			    if(doingChallenge) {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r) {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
				        app.viewManager.goToView(app.viewManager.VIEW.FEEDBACK);
				        viewLabel.innerText = "Feedback You Received";
			        }

			    }
			    else {
			        app.viewManager.goToView(app.viewManager.VIEW.FEEDBACK);
			        viewLabel.innerText = "Feedback You Received";
			    }
			}
		});

		app.utils.assignFuncToButtonViaID("mps-submissions-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.SEE_SUBMISSIONS_STUDENT)
			{
			    var doingChallenge = app.challenge.doingChallenge;
			    if(doingChallenge) {
                    var r = confirm("You will lose progress if you leave now.  Sure?");
                    if (r) {
                        app.annalist.saveForLogs("left_challenge", "");
                        app.challenge.doingChallenge = false;
				        app.viewManager.goToView(app.viewManager.VIEW.SEE_SUBMISSIONS_STUDENT);
				        viewLabel.innerText = "Your Submissions";
                    }

			    }
			    else {
                    app.viewManager.goToView(app.viewManager.VIEW.SEE_SUBMISSIONS_STUDENT);
                    viewLabel.innerText = "Your Submissions";
                }
			}
		});

		app.utils.assignFuncToButtonViaID("mps-change-password-button" , function (){
		    var doingChallenge = app.challenge.doingChallenge;
		    if(doingChallenge) {
                var r = confirm("You will lose progress if you leave now.  Sure?");
                if (r) {
                    app.annalist.saveForLogs("left_challenge", "");
                    app.challenge.doingChallenge = false;
                    viewLabel.innerText = "Change the Password";
                    app.viewManager.goToView(app.viewManager.VIEW.CHANGE_PASSWORD);
                }
		    }
		    else {
		        viewLabel.innerText = "Change the Password";
		        app.viewManager.goToView(app.viewManager.VIEW.CHANGE_PASSWORD);
            }
        });



		app.utils.assignFuncToButtonViaID("mpt-assignments-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.ASSIGNMENTS_TEACHER)
			{
				app.viewManager.goToView(app.viewManager.VIEW.ASSIGNMENTS_TEACHER);
				viewLabel.innerText = "Assignments";
			}
		});

		app.utils.assignFuncToButtonViaID("mpt-challenges-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.CREATE_CHALLENGE)
			{
				app.viewManager.goToView(app.viewManager.VIEW.CREATE_CHALLENGE);
			}
		});


		app.utils.assignFuncToButtonViaID("mpt-view-challenges-button", function() {
		    var modalBody = app.modalContentManager.getModalContent("verify-user");
            var modalData = app.utils.createModal("verify-user-modal-view-challenges", "Enter your credentials", modalBody, true);
            document.body.appendChild(modalData.modal);
            modalData.modal.style.display = "block";

            var submitBtn = modalData.submit;

		    submitBtn.addEventListener("click", function () {
		        var email = document.getElementById("verify-use-email").value;
                var password = document.getElementById("verify-use-password").value;

                var data = {};
                data = {email: email, password:password};

                app.net.sendMessage("go_to_google_sheet", data);
                var parentNode = modalData.modal.parentNode;
				parentNode.removeChild(modalData.modal);
            });
		});


		app.utils.assignFuncToButtonViaID("mpt-reload-challenges-button", function() {
		    var modalBody = app.modalContentManager.getModalContent("verify-user");
            var modalData = app.utils.createModal("verify-user-modal-reload-challenges", "Enter your credentials", modalBody, true);
            document.body.appendChild(modalData.modal);
            modalData.modal.style.display = "block";

            var submitBtn = modalData.submit;

		    submitBtn.addEventListener("click", function () {
		        var email = document.getElementById("verify-use-email").value;
                var password = document.getElementById("verify-use-password").value;

                var data = {};
                data = {email: email, password: password};

                app.net.sendMessage("export_from_google_sheet", data);
                var parentNode = modalData.modal.parentNode;
				parentNode.removeChild(modalData.modal);
            });
		});

		app.utils.assignFuncToButtonViaID("mpt-standards-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.SEE_STANDARDS_TEACHER)
			{
				app.viewManager.goToView(app.viewManager.VIEW.SEE_STANDARDS_TEACHER);
				viewLabel.innerText = "Standards Available";
			}
		});

		app.utils.assignFuncToButtonViaID("mpt-manage-systems-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.MANAGE_SYSTEMS_TEACHER)
			{
				app.viewManager.goToView(app.viewManager.VIEW.MANAGE_SYSTEMS_TEACHER);
				viewLabel.innerText = "Manage Systems";
			}
		});


		app.utils.assignFuncToButtonViaID("mpt-submissions-button", function() {
			if (app.viewManager.currentView.title !== app.viewManager.VIEW.SEE_SUBMISSIONS_TEACHER)
			{
				app.viewManager.goToView(app.viewManager.VIEW.SEE_SUBMISSIONS_TEACHER);
				viewLabel.innerText = "Student's Submissions";
			}
		});


		app.utils.assignFuncToButtonViaID("mpt-signout-button",function(){app.user.signout();});
		app.utils.assignFuncToButtonViaID("mps-signout-button",function(){
		    var doingChallenge = app.challenge.doingChallenge;
		    if(doingChallenge) {
		        var r = confirm("You will lose progress if you leave now.  Sure?");
		        if (r)
		        {
		            app.user.signout();
		        }
		    }
		    else{
		        app.user.signout();
            }
		});
	}

	loadResources()
	{
   	 	//Sounds
    	this.audioManager.queueSound("button_click.wav");
    	this.audioManager.queueSound("space-ship-flight.wav");
	}
}

getRandomAdjective = function () {
	var adjectives = ["attractive","bald","beautiful","chubby","clean","dazzling","elegant","fancy","fit","flabby","glamorous",
		"gorgeous","handsome","long","magnificent","muscular","plain","plump","quaint","scruffy","shapely","short","skinny",
		"stocky","unsightly","gigantic","epic","cunning","floaty", "flying","tasty","sleepy","sneaky","spontaneous","poisonous",
		"venomous","alive","careful","clever","dead","easy","famous","gifted","hallowed","helpful","important","inexpensive",
		"mealy","mushy","odd","poor","powerful","rich","shy","tender","vast","ashy","black","blue",
		"gray","green","icy","orange","purple","red","white","yellow"];

	var result = app.utils.getRandomInt(adjectives.length);
	return adjectives[result].charAt(0).toUpperCase() + adjectives[result].slice(1) + " ";
};


setInterval(function()
{
	app.annalist.sendAndClearLogs(false);
	app.heartbeat()
}, 20000);
