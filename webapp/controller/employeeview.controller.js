sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
 
    return BaseController.extend("demo.ladera.employee.controller.employeeview", {
        onInit() {
           this.initialLoad = false;
           var productsModel = new sap.ui.model.json.JSONModel("model/employee.json");
             this.getView().setModel(productsModel);
            sap.ui.core.UIComponent.getRouterFor(this).getRoute("employeeobject").attachPatternMatched(this._objPatternMatched,this);
         
        },
        // _objPatternMatched:function(oEvent){
        //   var passedProductIndex = oEvent.getParameter("arguments").productIndex;          ;
        //   var productDetailModel = new sap.ui.model.json.JSONModel(this.getView().getModel().oData.Products[passedProductIndex]);
        //   this.getView().setModel(productDetailModel,"productDetailModel");
        // },
        _objPatternMatched:function(oEvent){
          var that = this;
          var passedProductIndex = oEvent.getParameter("arguments").productIndex;
          if(!this.initialLoad) {
            this.initialLoad =true;
            window.setTimeout(function(){
              var productDetailModel = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.Employees[passedProductIndex]);
              that.getView().setModel(productDetailModel,"productDetailModel");
            },1500);
          }else{
            var productDetailModel = new sap.ui.model.json.JSONModel(that.getView().getModel().oData.Employees[passedProductIndex]);
              that.getView().setModel(productDetailModel,"productDetailModel");
          }
        },
        onNavigationBack : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
          }
    });
  });