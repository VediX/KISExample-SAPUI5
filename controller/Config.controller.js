sap.ui.define([
	"KIS/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("KIS.controller.Config", {
		
		onInit : function() {
			this.getRouter().getRoute("CONFIG").attachPatternMatched(this._viewMatched, this);
		},
 
		_viewMatched : function() {
			
		}
	});
});