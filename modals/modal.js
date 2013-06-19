/*	SETUP OPTIONS
	 * The options parameter would consist of
	 * 1. Modal Options. 								(modalOptions)		--> Object
	 * 2. Custom css classes for the modal. 			(customCssClass)	--> String
	 * 3. Boolean to animate modal show/hide. 			(animate)			--> Boolean
	 * 4. Properties required by the modal template.	(templateData)		--> Object
   ***** 
	 * property			: default value
	 * 
	 * modalOptions		: { backdrop: true, keyboard: true, show: false },
	 * animate			: true,
	 * customCssClass	: "",
	 * data		: {}
*/

$.Controller("Modal",
{
	setup: function(id, options){
		this.options = $.extend({
				modalOptions	: { backdrop: true, keyboard: true, show: false },
				animate			: true,
				customCssClass	: "",
				data			: {}
			}, options);
		
		var animateCss = this.options.animate === false ? "" : " fade";
		var modalContainer = $('<div id="' + id + '" class="modal' + animateCss + ' ' + this.options.customCssClass + '" tabindex="-1" role="dialog" aria-labelledby="' + id + 'Label" aria-hidden="true"/>');
		
		$("#"+id).remove();
		$("body").append(modalContainer);
		this._super(modalContainer, options);
	},
	
	init: function(){
		this.element.html($.View(this.template, this.options.data))
					.modal(this.options.modalOptions);
	},

	show: function() {
		this.element.modal('show');
		
		//Runs any functions specified by user after modal has been shown.
		if (this.afterShow && $.isFunction(this.afterShow)){
			this.afterShow();
		}
	},

	close: function(){
		this.element.modal('hide');
		this.element.remove();
	}
});
