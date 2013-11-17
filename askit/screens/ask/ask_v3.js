/*******************************  ASK FLOW (STAGE 1/3)  *******************************

 1. This page takes in a param called "method" which determines the input choice.
 2. If no input method is specified user is shown the menu to choose.
 3. Upon entering question content, author id and question is stored in qnWorkflow
 4. User is then sent to ask/classify to classify question as a final step

// TODO: Handle back functionality -> Load content from workflow for editing.
************************************************************************************/

Screen.extend("Ask",
{
	init: function( el, options ) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html( "askit_screens_common_common_stage_v3", { title: "Ask Your Question!" } );
		$(".mainMenu").collapse('hide'); // Hides dropdown nav
		
		if( options.route.params.method ) {
			this.askMethod = options.route.params.method;
			if( this.askMethod == "image" ) {
				$(".stageContent").html( "askit_screens_ask_ask_image_v3", qnWorkflow );
			}
			if( this.askMethod == "text" ) {
				$(".stageContent").html( "askit_screens_ask_ask_text_v3", {} );
			}
		}
		// Show default menu
		else {
			$(".stageContent").html( "askit_screens_ask_ask_menu_v3", {} );
		}

		// Handles case where user clicks back during ask process.
		if( typeof qnWorkflow != "undefined" && qnWorkflow.edit ) {
			qnWorkflow.edit = false;
			if( qnWorkflow.method == "text" ) {
				$("#ask_text_content").val(qnWorkflow.content);
			}
		}

		app.hideLoader();
		qnWorkflow = {}; // Resets qnWorkflow
	},

	"#ask_upload_existing_image click": function() {
		$("#uploadImage").click();
		// app.setLocation( "/ask?method=" + qnWorkflow.method );
	},

	"#ask_take_new_image click": function() {
		qnWorkflow.method = "text";
		app.setLocation( "/ask?method=" + qnWorkflow.method );
	},

	"#ask_type_new click": function() {
		qnWorkflow.method = "text";
		app.setLocation( "/ask?method=" + qnWorkflow.method );
	},

	"#ask_text_submit click": function() {
		var questionContent = $("#ask_text_content").val();

		if( questionContent == "" ) {
			$("#ask_text_msg").html("Please enter your question.").removeClass("hide");
		}
		else {
			qnWorkflow.method = this.askMethod;
			qnWorkflow.author = app.currentUser.id;
			qnWorkflow.content = questionContent;

			app.setLocation( "/ask/classify" );
		}
	},

	"#uploadImage change": function( el, ev ) {
		// Read files
		var files = ev.target.files,
				file 	= files[0];

		// Ensure file is an image
		if( file.type.match(/image.*/)) {
			// Load image
			var reader = new FileReader();
			reader.onload = function( readerEvent ) {
				var image = new Image();
				image.onload = function( imageEvent ) {
					// Resize image
					var canvas 	= document.createElement('canvas'),
							maxSize = 1200,
							width 	= image.width,
							height  = image.height;

					if( width > height && width > maxSize ) {
						height 	*= 	maxSize / width;
						width 	= 	maxSize;
					}
					else {
						width 	*= 	maxSize / height;
						height 	= 	maxSize;
					}
					canvas.width 	= width;
					canvas.height = height;
					canvas.getContext('2d').drawImage( image, 0, 0, width, height );

					// Upload image
					var xhr = new XMLHttpRequest();
					if( xhr.upload ) {
						// File uploaded / failed
						xhr.onreadystatechange = function( event ) {
							if( xhr.readyState == 4 ) {
								if( xhr.status == 200 ) {
									// Assign image location to workflow
									qnWorkflow.method = "image";
									qnWorkflow.imageSrc = xhr.responseText;
									console.log( "Image uploaded: " + xhr.responseText );
									ev.target.value = "";
									app.setLocation( "/ask?method=" + qnWorkflow.method );
								}
								else {
									console.error( "Image failed." );
								}
							}
						}

						// Commence upload
						xhr.open( 'post', 'server/process-upload.php', true );
						xhr.send( canvas.toDataURL('image/jpeg') );
					}
				}
				image.src = readerEvent.target.result;
			}
			reader.readAsDataURL(file);
		}
	},

});
window.routes["/ask"] = Ask;
