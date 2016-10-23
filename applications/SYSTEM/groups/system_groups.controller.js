sap.ui.define([
	"KIS/controller/SectionController",
	"sap/ui/model/json/JSONModel"
], function(SectionController, JSONModel) {
	"use strict";

	return SectionController.extend("KIS.applications.SYSTEM.groups.system_groups", {
		_viewName: "SYSTEM_GROUPS",
		
		onInit : function() {
			SectionController.prototype.onInit.apply(this, arguments);
		},
		
		_viewMatched : function() {
			SectionController.prototype._viewMatched.apply(this, arguments);
		}
	});
});