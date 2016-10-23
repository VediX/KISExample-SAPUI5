sap.ui.define([
	"KIS/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("KIS.controller.Home", {
		
		onInit : function() {
			this.getRouter().getRoute("HOME").attachPatternMatched(this._viewMatched, this);
		},
 
		_viewMatched : function() {
			
		}
	});
});