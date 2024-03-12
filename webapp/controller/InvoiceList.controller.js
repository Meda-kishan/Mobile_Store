sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
	"use strict";

	return Controller.extend("store.mobilestore.controller.InvoiceList", {
		
		onPress(oEvent) {
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();

			console.log(oItem.getBindingContext("invoice"),"Binding contexxt")
			
			console.log(oItem.getBindingContext("invoice").getPath(),"Binding Path")

			console.log(oItem.getBindingContext("invoice").getPath().substr(1)," modified Binding path ")

			debugger
			oRouter.navTo("detail",
			{invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))}
			);
		},
		
		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});