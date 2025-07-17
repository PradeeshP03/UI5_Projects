sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
 
    return BaseController.extend("demo.ladera.assesment1.controller.listpage", {
        onInit() {
          sap.ui.core.UIComponent.getRouterFor(this).getRoute("listpage").attachPatternMatched(this._objPatternMatched,this);
        },
        // _objPatternMatched:function(oEvent){
        //   var passedProductIndex = oEvent.getParameter("arguments").materialIndex;
        //   var productDetailModel = new sap.ui.model.json.JSONModel(this.getView().oPropagatedProperties.oModels.material.oData[passedProductIndex]);
        //   this.getView().setModel(productDetailModel.oData,"productDetailModel");
        // },
      //   _objPatternMatched: function (oEvent) {
      //     var passedProductIndex = oEvent.getParameter("arguments").materialIndex;
      
      //     var oMaterialModel = this.getView().getModel("material");
      //     var oProductData = oMaterialModel.getProperty("/" + passedProductIndex);
      
      //     var oProductDetailModel = new sap.ui.model.json.JSONModel(oProductData);
      //     this.getView().setModel(oProductDetailModel, "productDetailModel");
      // },
      // _objPatternMatched: function (oEvent) {
      //   var sMaterialId = oEvent.getParameter("arguments").materialIndex;
      //   var aMaterials = this.getView().getModel("material").getData();
      
      //   // Find material object with matching materialId
      //   var oMatchedMaterial = aMaterials.find(function (oMat) {
      //     return oMat.materialId === sMaterialId;
      //   });
      
      //   if (oMatchedMaterial) {
      //     var oDetailModel = new sap.ui.model.json.JSONModel(oMatchedMaterial);
      //     this.getView().setModel(oDetailModel, "productDetailModel");
      //   } else {
      //     sap.m.MessageToast.show("Material not found");
      //   }
      // },
      _objPatternMatched: function (oEvent){
     var matIndex = oEvent.getParameter("arguments").materialIndex;
     var getMaterial = this.getView().getModel("material").getData();

     for(var a=0;a<getMaterial.length;a++){
      if(getMaterial[a].materialId == matIndex){
        var getVendors = getMaterial[a].vendors
      }
          var oVendorDetailModel = new sap.ui.model.json.JSONModel(getVendors);
          this.getView().setModel(oVendorDetailModel, "VendorDetailModel");
     }
      },
         onNavigationBack:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
          },
          onVendor : function(evt){
            var vendorSearch = evt.getParameter("newValue");
            var filter = new sap.ui.model.Filter("vendorName", "Contains", vendorSearch);
            this.getView().byId("VendorList").getBinding("items").filter(filter);
          }
    });
  });