sap.ui.define([
	"KIS/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("KIS.controller.About", {
		
		onInit : function() {
			this.getRouter().getRoute("ABOUT").attachPatternMatched(this._viewMatched, this);
		},
 
		_viewMatched : function() {
			
		}
	});
});