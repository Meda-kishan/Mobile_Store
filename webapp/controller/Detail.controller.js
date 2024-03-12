sap.ui.define([
	"sap/ui/core/mvc/Controller"
], (Controller) => {
	"use strict";

	return Controller.extend("store.mobilestore.controller.Detail", {
		onInit() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		onObjectMatched(oEvent) {
			
            console.log(oEvent.getParameter("arguments"),"arguememts")

            console.log(oEvent.getParameter("arguments").invoicePath,"invouce path")
            debugger

            this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
				model: "invoice"
			});
		}
	});
});