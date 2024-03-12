sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], (Controller, JSONModel,MessageToast) => {
	"use strict";

	return Controller.extend("store.mobilestore.controller.MobileDetail", {
		
        onInit()
        {
            const oRouter=this.getOwnerComponent().getRouter();
            oRouter.getRoute("mobiledetail").attachPatternMatched(this.onObjectMatched,this);


        },

        onObjectMatched(oEvent) {
            console.log("oevent",oEvent)
            debugger
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").mobilePath),
				model: "mobile"

			});
			const path=oEvent.getParameter("arguments").mobilePath
			const model=this.getView().getModel("mobile")
			const data=model.getProperty("/"+path)
			console.log(data)
			console.log("Data from model")

			var oModel=new JSONModel(

				{
					HTML  : 
					"<span  style=\"color : Red \" > Mobile Name : </span>" + `<span> ${data.name} </span>`+"<br />"+"<br />"+
					"<span style=\"color : Red \"> Mobile Model : </span>" + `<span> ${data.modelNumber} </span>`+"<br />"+"<br />"+
					"<span  style=\"color : Red \"> Mobile Color : </span>" + `<span> ${data.color} </span>`+"<br />"+"<br />"+
					"<span  style=\"color : Red \"> Mobile Size : </span>" + `<span> ${data.size} </span>`+"<br />"+"<br />"+
					"<span style=\"color : Red \"> Mobile Camera : </span>" + `<span> ${data.size} </span>`+"<br />"+"<br />"+
					"<span  style=\"color : Red \"> Mobile size : </span>" + `<span> ${data.size} </span>`+"<br />"+"<br />"+
					"<span  style=\"color : Red \"> Mobile Description : </span>" + `<span> ${data.Description} </span>`+"<br />"+"<br />"+
					"<h5 style=\"color: Red\">PRICE</h5>"+`<h3>${data.price} $</h3>`

					
				
					
				}
			);
			this.getView().setModel(oModel);
		},

		onBuyProduct()
		{
			this.prd??=this.loadFragment(
				{
					name: "ui5.walkthrough.view.mobile.fragments.buy"
				}
			);

			this.prd.then((odialog) => odialog.open())
			
		},
		cancel_buying()
		{
			this.byId("buy_dialog").close()
		},

		onConfirmProduct()
		{
			this.byId("buy_dialog").close();
			MessageToast.show("Product Bought Successfully");
			
		}
	
	});
});





