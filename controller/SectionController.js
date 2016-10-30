sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("KIS.controller.SectionController", {
		_viewName: null,
		
		onInit: function() {
			/*var oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});
			this.setModel(oViewModel);*/
			if (this._viewName) {
				this.getRouter().getRoute(this._viewName).attachPatternMatched(this._viewMatched, this);
			}
		},
		
		_viewMatched: function() {
			//
		},
		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

		/*onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Main", {}, true);
			}
		},
		
		onPressNavHome: function(oEvent) {
			this.getRouter().navTo("Main", {});
		}*/
	});

});