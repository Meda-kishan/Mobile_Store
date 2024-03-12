sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/FlexBox",
	"../view/formatters/formatter"
], (Controller,JSONModel,Filter, FilterOperator,MessageToast,Popover, Button,FlexBox,formatter) => {
	"use strict";

	return Controller.extend("store.mobilestore.controller.MobilePage" ,{
		
		formatter : formatter,

		products_pressed()
		{
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("mobilelist");
			
		},

		contact_us()
		{
			this.dialog??=this.loadFragment(
				{
					name: "store.mobilestore.view.fragments.contact"
				}
			);

			this.dialog.then((odialog) => odialog.open())
			
		},

		closeDialog()
		{
			this.byId("contactusDialog").close();
			
		},

		iconFilter(oEvent)
		{
			

			var oBinding=this.byId("products_list").getBinding("items")
			const skey= oEvent.getParameter("key")
			const aFilter=[]

			if(skey==="128")
			{
				aFilter.push(new Filter("ROM",FilterOperator.EQ,skey))
			}

			else if(skey=="64")
			{
				aFilter.push(new Filter("ROM",FilterOperator.EQ,skey))
			}

			else if(skey=="900")
			{
				aFilter.push(new Filter("price",FilterOperator.GT,skey))
			}

			else if(skey=="750")
			{
				aFilter.push(new Filter("price",FilterOperator.LT,skey))
			}


			oBinding.filter(aFilter);
			

		},

			onFilterproducts(oEvent)
			 {
				// build filter array
				console.log("on filter product is called")
				const aFilter = [];
				const sQuery = oEvent.getParameter("query");
				if (sQuery) {
					// aFilter.push(new Filter(("name","modelNumber"), FilterOperator.Contains, sQuery));
					 aFilter.push(new Filter({
						filters:[ 
							new Filter("name",FilterOperator.Contains,sQuery),
							new Filter("modelNumber", FilterOperator.Contains,sQuery),
							new Filter("size",FilterOperator.Contains,sQuery),
							new Filter("camera",FilterOperator.Contains,sQuery),
							new Filter("price",FilterOperator.LT,sQuery),

							
								],
							 }))
					
				}
	
				// filter binding
				const oList = this.byId("products_list");
				const oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);
			},


			mobile_clicked(oEvent)
			{
				console.log("mobile_clicked is executing")
				const oItem=oEvent.getSource();
				const oRouter=this.getOwnerComponent().getRouter();
				oRouter.navTo("mobiledetail",
				{
					mobilePath:window.encodeURIComponent(oItem.getBindingContext("mobile").getPath().substr(1))
					
				}
				
				);
			},

			load_signin(oEvent)
			{
				

				var signin_btn= new sap.m.Button(
					{
						
						text: "Sign-in",
						press : this.open_signin_frag.bind(this),
						

					}
				);

				var signup_btn= new sap.m.Button(
					{
						
						text: "Sign-up",
						press: this.open_signup_frag.bind(this),
						
					}
						
					);

			

					var oFlexBox = new FlexBox({
						direction : sap.m.FlexDirection.Row,
						alignItems: sap.m.FlexAlignItems.Center,
						justifyContent: sap.m.FlexJustifyContent.SpaceAround,
						items: [signin_btn, signup_btn]
						
						
					});



					// oFlexBox.addItem(signin_btn);
					// oFlexBox.addItem(signup_btn);
					

			    var oPopover = new Popover({
					
					title: "Sign-in / Sign-up",
					content: [oFlexBox],
					placement: sap.m.PlacementType.Auto 
				});

				oPopover.openBy(oEvent.getSource());
				
				

			},

			signin_success()
			{
				const data=this.getView().getModel("signin_fei__M").getData();
				console.log(data);
				if(data.signin.username=="" || data.signin.password==""  )
				{
					alert("Fill the mandatory feilds")

				}
				else{
					
					this.byId("signin_dialog").close();
					MessageToast.show("Login successfully");
					this.byId("header_text").setVisible(true);
					this.byId("header_btn").setVisible(true);
					// this.byId("username_signin_inpt").setEditable(false);
					// this.byId("password_signin_inpt").setEditable(false);

					this.byId("login_list_item").setType("Inactive");
					

					

					}
		},

		collapse_signin()
		{
						this.byId("signin_dialog").close();
			this.byId("username_signin_inpt").setEditable(true);
			this.byId("password_signin_inpt").setEditable(true);
			
		},

			signup_success()
			{
				this.byId("signup_dialog").close();
				this.byId("header_text").setVisible(true);
				this.byId("header_btn").setVisible(true);

				this.byId("login_list_item").setType("Inactive");

				MessageToast.show("Signup Successfully");
			},

			signup_close()
			{
				this.byId("signup_dialog").close();
			},


			open_signin_frag()
			{
				this.prd??=this.loadFragment(
					{
						name:"store.mobilestore.view.fragments.signin"
					}
				);

				this.prd.then((odialog) => odialog.open())
			},

			open_signup_frag()
			{
				this.page??=this.loadFragment(
					{
						name:"store.mobilestore.view.fragments.signup"
					}
				);
				this.page.then((odialog) => odialog.open())
			},
			
			onlogout()
			{
				this.byId("username_signin_inpt").setValue("");
				this.byId("password_signin_inpt").setValue("");

				// this.byId("email_signup_inpt").setValue("");

				this.byId("header_text").setVisible(false);
				this.byId("header_btn").setVisible(false);

				this.byId("login_list_item").setType("Navigation");

	


				
				var oModel = this.getView().getModel("signin_fei__M");
				// oModel.setData({});
				// oModel.refresh();
				debugger
					

			},

			onInit()
			{
	
				const signin_feilds=
				 {
					signin:
					{
						username: "",
						password: ""
					}
				 };

				 const signin_model=new JSONModel(signin_feilds);

				 this.getView().setModel(signin_model,"signin_fei__M")
				 console.log("model is created");





			}



			


		
		
	
	});
});