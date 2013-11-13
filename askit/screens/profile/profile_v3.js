Screen.extend("Profile",
{
  init: function( el, options ) {
    this.classname = this.Class.fullName;
    this.stageCssClass = "aiscreen-" + this.Class.shortName;
    this.__base__setupDefaultStage();
    $(".mainMenu").collapse("hide");
    this.element.html( "askit_screens_common_common_stage_v3", { title: "Your Profile"} );
    $(".stageContent").html( "askit_screens_profile_profile_view_v3", app.currentUser.profile() );
    $("#update-msg").html("");
    app.hideLoader();
  },

  verifyNameFields: function() {
    var valid           = true,
        firstNameInput  = $("#firstname"),
        lastNameInput   = $("#lastname"),
        firstNameError  = $("#firstname-error"),
        lastNameError   = $("#lastname-error");

    $("#update-msg").html("");
    firstNameInput.removeClass("error");
    lastNameInput.removeClass("error");
    firstNameError.html("");
    lastNameError.html("");

    if( firstNameInput.val() == "" ) {
      firstNameInput.addClass("error");
      firstNameError.html("Please enter a first name.");
      valid = false;
    }
    else if( lastNameInput.val() == "" ) {
      lastNameInput.addClass("error");
      lastNameError.html("Please enter a last name.");
      valid = false;
    }
    else {
      valid = true;
    }
    return valid;
  },

  verifyPwdFields: function() {
    var valid         = true,
        currPwdInput  = $("#current-password"),
        newPwdInput   = $("#new-password"),
        rnewPwdInput  = $("#rnew-password"),
        currPwdError  = $("#current-password-error"),
        newPwdError   = $("#new-password-error"),
        rnewPwdError  = $("#rnew-password-error"),
        currPwdValue  = currPwdInput.val(),
        newPwdValue   = newPwdInput.val(),
        rnewPwdValue  = rnewPwdInput.val();

    $("#update-msg").html("");
    currPwdInput.removeClass("error");
    newPwdInput.removeClass("error");
    rnewPwdInput.removeClass("error");
    currPwdError.html("");
    newPwdError.html("");
    rnewPwdError.html("");

    if( currPwdValue == "" ) {
      currPwdInput.addClass("error");
      currPwdError.html("Field cannot be blank.");
      valid = false;
    }
    else if( newPwdValue == "" ) {
      newPwdInput.addClass("error");
      newPwdError.html("Field cannot be blank.");
      valid = false;
    }
    else if( rnewPwdValue == "" ) {
      rnewPwdInput.addClass("error");
      rnewPwdError.html("Field cannot be blank.");
      valid = false;
    }
    else if( newPwdValue != rnewPwdValue ) {
      newPwdInput.addClass("error");
      rnewPwdInput.addClass("error");
      newPwdError.html("Passwords do not match.");
      rnewPwdError.html("Passwords do not match.");
      valid = false;
    }
    else {
      valid = true;
    }
    return valid;
  },

  onUpdateProfileDone: function( response ) {
    console.log( "In onUpdateProfileDone" );
    $("#update-msg").html("Profile updated successfully.");
    return;
  },

  onUpdateProfileFail: function( response ) {
    console.error( "In onUpdateProfileFail. Response : ", response );
    $("#update-msg").html("Profile update failed. Please try again.");
    return;
  },

  onUpdatePasswordDone: function( response ) {
    console.log( "In onUpdatePasswordDone." );
    $("#update-msg").html("Password updated successfully");
    return;
  },

  onUpdatePasswordFail: function( response ) {
    console.error( "In onUpdatePasswordFail. Response is : ", response );
    if( response.error === "Password invalid" ) {
      $("#current-password-error").html("Invalid password.");
    }
    else {
      $("#update-msg").html("Password update failed. Please try again.");
    }
    return;
  },

  ".update-name-button click": function() {
    app.showLoader();

    var newFirstName  = $("#firstname").val(),
        newLastName   = $("#lastname").val(),
        username      = $("#username").val(),
        params        = {};

    if( this.verifyNameFields() ) {
      params = {
        email     : username,
        firstName : newFirstName,
        lastName  : newLastName
      };

      $.when(
        app.currentUser.updateProfile( params )
      ).then(
        this.proxy( this.onUpdateProfileDone ),
        this.proxy( this.onUpdateProfileFail )
      );
    }
    app.hideLoader();
    return false;
  },

  ".change-password-button click": function() {
    app.showLoader();

    var currPwd = $("#current-password").val(),
        newPwd  = $("#new-password").val(),
        rnewPwd = $("#rnew-password").val(),
        email   = $("#username").val(),
        params  = {};

    if( this.verifyPwdFields() ) {
      params = {
        email   : email,
        currPwd : currPwd,
        newPwd  : newPwd
      };

      $.when(
        app.currentUser.updatePassword( params )
      ).then(
        this.proxy( this.onUpdatePasswordDone ),
        this.proxy( this.onUpdatePasswordFail )
      );
    }
    app.hideLoader();
    return false;
  },
});
window.routes["/profile"] = Profile;