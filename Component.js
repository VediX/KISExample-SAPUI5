sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";
	
	return UIComponent.extend("KIS.Component", {
		
		metadata : {
			manifest: "json",
			version: "1.0",
			includes: ["css/style.css"]
		},
		
		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
		},
		exit: function() {
			if (UIComponent.prototype.exit) {
				UIComponent.prototype.exit.apply(this, arguments);
			}
		}
	});
});