sap.ui.define([
	"KIS/controller/SectionController"
], function(SectionController) {
	"use strict";

	return SectionController.extend("KIS.applications.MOD2.section2.mod2_section2", {
		_viewName: "MOD2_SECTION2",
		
		onInit : function() {
			SectionController.prototype.onInit.apply(this, arguments);
		},
		
		_viewMatched : function() {
			SectionController.prototype._viewMatched.apply(this, arguments);
		}
	});
});