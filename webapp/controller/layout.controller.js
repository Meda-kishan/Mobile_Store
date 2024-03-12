sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
 ], (Controller, JSONModel) => {
    "use strict";
 
	return Controller.extend("store.mobilestore.controller.layout", {

        show_msg()
        {
            MessageToast.show("Hello this is from MessageToast");
        },
        
        register_details()
        {
            
            const model_data=this.getView().getModel("user_data").getData();
            console.log("register details:", model_data)



            Object.keys(model_data.students).forEach(element => {
                console.log(`${element}: ${model_data.students[element]}`);
            })


            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("registered");

            

    

        },


    });
 });