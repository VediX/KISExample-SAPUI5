sap.ui.define([
	"KIS/controller/SectionController"
	//"sap/ui/model/json/JSONModel"
], function(SectionController) {
	"use strict";

	return SectionController.extend("KIS.applications.MOD3.section1.mod3_section1", {
		_viewName: "MOD3_SECTION1",
		
		onInit : function() {
			SectionController.prototype.onInit.apply(this, arguments);
		},
		
		_viewMatched : function() {
			SectionController.prototype._viewMatched.apply(this, arguments);
		}
	});
});