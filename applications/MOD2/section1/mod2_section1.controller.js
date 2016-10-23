sap.ui.define([
	"KIS/controller/SectionController",
	"sap/ui/model/json/JSONModel"
], function(SectionController, JSONModel) {
	"use strict";

	return SectionController.extend("KIS.applications.MOD2.section1.mod2_section1", {
		_viewName: "MOD2_SECTION1",
		
		onInit : function() {
			SectionController.prototype.onInit.apply(this, arguments);
		},
		
		_viewMatched : function() {
			SectionController.prototype._viewMatched.apply(this, arguments);
		}
	});
});