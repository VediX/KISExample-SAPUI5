// for debug sap-ui-core and other files use parameter: ?sap-ui-debug=true
sap.ui.define([
	"KIS/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	'sap/m/Popover',
	'sap/m/Button'
], function(BaseController, JSONModel, Popover, Button) {
	"use strict";
	
	return BaseController.extend("KIS.controller.Main", {
		
		openSections: [],
		
		onInit : function() {
			
			this.getView().setModel(new JSONModel({
				applications: [],
				system: [],
				horizmenu: []
			}), "mainmenu");
			
			var menuApplications = new JSONModel();
			menuApplications.loadData("model/applications.json");
			menuApplications.attachRequestCompleted( function(oResult) {
				var oApplications = oResult.getSource().getData().applications;
				var oRouter = this.getRouter();
				var oMainmenuApplications = [];
				oApplications.forEach( function(oApp) {
					var oAppItem = {
						title: oApp.title,
						icon: oApp.icon,
						expanded: oApp.expanded !== undefined ? oApp.expanded : false,
						items: []
					};
					oApp.sections.forEach( function(oSection) {
						oAppItem.items.push({
							title: oSection.title,
							key: oApp.key.toUpperCase() + "_" + oSection.key.toUpperCase()
						});
						oRouter.addRoute({
							pattern: oApp.key.toLowerCase() + "/" + oSection.key.toLowerCase(),
							name: oApp.key + "_" + oSection.key,
							viewPath: "KIS.applications."+oApp.key+"."+oSection.key.toLowerCase(),
							view: oApp.key.toLowerCase() + "_" + oSection.key.toLowerCase(),
							viewLevel: 2
						});
					});
					oMainmenuApplications.push(oAppItem);
				});
				this.getView().getModel("mainmenu").setProperty("/applications", oMainmenuApplications);
			}.bind(this));
			
			var menuSystem = new JSONModel();
			menuSystem.loadData("model/system.json");
			menuSystem.attachRequestCompleted( function(oResult) {
				var oApp = oResult.getSource().getData();
				var oRouter = this.getRouter();
				var oAppItem = {
					title: oApp.title,
					icon: oApp.icon,
					expanded: false,
					items: []
				};
				oApp.sections.forEach( function(oSection) {
					oAppItem.items.push({
						title: oSection.title,
						key: oApp.key.toUpperCase() + "_" + oSection.key.toUpperCase()
					});
					oRouter.addRoute({
						pattern: oApp.key.toLowerCase() + "/" + oSection.key.toLowerCase(),
						name: oApp.key + "_" + oSection.key,
						viewPath: "KIS.applications."+oApp.key+"."+oSection.key.toLowerCase(),
						view: oApp.key.toLowerCase() + "_" + oSection.key.toLowerCase(),
						viewLevel: 2
					});
				});
				this.getView().getModel("mainmenu").setProperty("/system", [
					oAppItem,
					{
						title: 'Config',
						key: "CONFIG",
						icon: 'sap-icon://action-settings'
					}, {
						title: 'About system',
						key: "ABOUT",
						icon: 'sap-icon://hint'
					}
				]);
			}.bind(this));
			
			this.buildOpenSectionsMenu();
			
			this.getView().setModel(new JSONModel(
				[
					{ icon: "img/todo.png", number: "12345", numberUnit: "meas.", title: "Module1 Section1", info: "Module1" },
					{ icon: "img/todo.png", title: "Module1 Section2", info: "Module1" },
					{ icon: "img/todo.png", title: "Module3 Section1", info: "Module3" }
				]
			), "favorites");
			
			this.getView().attachBrowserEvent("click", function(oEvent) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				if (toolPage.getSideExpanded()) {
					var aside_id = "#" + viewId + "--toolPage-aside";
					var button = "#" + this.getOwnerComponent().getId() + "---mainmenu_btn"; // for the first building
					var button_recreated = "#mainmenu_btn"; // for further building // TODO: How it to improve?
					if ((! $(oEvent.target).closest(aside_id).length)
							&& (! $(oEvent.target).closest(button).length)
							&& (! $(oEvent.target).closest(button_recreated).length)) {
						this._asideMainmenuShowHide();
					}
				}
			}.bind(this));
		},
		
		buildOpenSectionsMenu: function() {
			var buttonsLeft = [
				{
					_control_type: "Button",
					id: "mainmenu_btn",
					icon: "sap-icon://menu2",
					type: sap.m.ButtonType.Transparent,
					_press: "onSideNavButtonPress",
					_overflowToolbarPriority: "NeverOverflow"
				},{
					_control_type: "ToolbarSpacer",
					width: "1px"
				}
			];
			var buttonsRight = [
				{
					_control_type: "ToolHeaderUtilitySeparator"
				},{
					_control_type: "ToolbarSpacer",
					_overflowToolbarPriority: "NeverOverflow",
					_overflowToolbarPriorityMinWidth: "1px"
				},{
					_control_type: "Button",
					icon: "sap-icon://account",
					type: sap.m.ButtonType.Transparent,
					_press: "handleUserNamePress",
					_overflowToolbarPriority: "NeverOverflow"
				}
			];
			this.getView().getModel("mainmenu").setProperty(
				"/horizmenu",
				[].concat(
					buttonsLeft,
					this.openSections.map( function(s) {
						return {
							_control_type: "Button",
							text: s.title,
							type: sap.m.ButtonType.Transparent,
							_overflowToolbarPriority: "Low",
							_press: "onPressHorizMenuSectionBut",
							_section_key: s.key
						};
					}.bind(this)),
					buttonsRight
				)
			);
		},
		
		onPressVerticalMenuItem: function(oEvent) {
			var item = oEvent.getParameter('item');
			var divGroup = $(window.event.target).closest("div.sapTntNavLIGroup");
			if ((! divGroup.length)
					|| ((divGroup.length) && (! divGroup.next("ul").children("li").length))) {
				this._asideMainmenuShowHide(false);
			}
			if ((item.getKey()) && (this.getRouter().getRoute(item.getKey()))) {
				this.getRouter().navTo(item.getKey(), {});
				// Add tab section in horizMenu
				if ((item.getKey() !== "CONFIG") && (item.getKey() !== "ABOUT")) {
					if (! this.openSections.filter( function(s) {
						return (s.key == item.getKey());
					}).length) {
						this.openSections.push({
							key: item.getKey(),
							title: item.getText()
						});
						this.buildOpenSectionsMenu();
					}
				}
			}
		},
		
		onPressHorizMenuSectionBut: function(oEvent) {
			this.getRouter().navTo(oEvent.getSource()._section_key, {});
		},
		
		onSideNavButtonPress : function() {
			this._asideMainmenuShowHide();
		},
		
		_asideMainmenuShowHide: function(makeVisible) {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			if (typeof makeVisible !== "undefined") {
				toolPage.setSideExpanded(makeVisible);
			} else {
				toolPage.setSideExpanded(! toolPage.getSideExpanded());
			}
		},
		
		handleUserNamePress: function (event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Profile',
						icon: 'sap-icon://key-user-settings',
						type: sap.m.ButtonType.Transparent,
						press: function() {
							this.getRouter().navTo("PROFILE", {});
						}.bind(this)
					}),
					new Button({
						text: 'Exit',
						icon: "sap-icon://log",
						type: sap.m.ButtonType.Transparent
					})
				]
			});
			popover.openBy(event.getSource());
		},
		
		horizMenuCreateContent: function(sId, oContext) {
			var controlType = oContext.getProperty("_control_type");
			var oControl = null;
			switch (controlType) {
				case "Button": {
					oControl = new Button(oContext.getProperty());
					if (oContext.getProperty("_press")) {
						if (this[oContext.getProperty("_press")]) {
							oControl.attachPress( this[oContext.getProperty("_press")].bind(this) );
						} else {
							console.error("horizMenuCreateContent: Error! Method "+oContext.getProperty("_press")+" does not exist!");
						}
						
					}
					if (oContext.getProperty("_section_key")) {
						oControl._section_key = oContext.getProperty("_section_key");
					}
					break;
				}
				case "ToolHeaderUtilitySeparator": {
					oControl = new sap.tnt.ToolHeaderUtilitySeparator(oContext.getProperty());
					break;
				}
				default: {
					oControl = new sap.m.ToolbarSpacer(oContext.getProperty());
				}
			}
			if (oContext.getProperty("_overflowToolbarPriority")) {
				var layoutData = new sap.m.OverflowToolbarLayoutData({
					priority: sap.m.OverflowToolbarPriority[oContext.getProperty("_overflowToolbarPriority")]
				});
				if (oContext.getProperty("_overflowToolbarPriorityMinWidth")) {
					layoutData.setMinWidth(oContext.getProperty("_overflowToolbarPriorityMinWidth"));
				}
				oControl.setLayoutData(layoutData);
			}
			return oControl;
		}
	});
});