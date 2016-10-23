sap.ui.define([
	"KIS/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("KIS.controller.Profile", {
		
		onInit : function() {
			this.getRouter().getRoute("PROFILE").attachPatternMatched(this._viewMatched, this);
		},
 
		_viewMatched : function() {
			
		}
	});
});