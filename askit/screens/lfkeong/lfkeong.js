Screen.extend("Lfkeong",
{
	init: function(el, options) {
		this.classname = this.Class.fullName;
		this.stageCssClass = "aiscreen-" + this.Class.shortName;
		this.__base__setupDefaultStage();
		this.element.html("askit_screens_common_common_stage", {title: "LF SQL Practice"});
		$(".stageContent").html("askit_screens_lfkeong_lfkeong_view", {});
	},
});
window.routes["/lfkeong"] = Lfkeong;