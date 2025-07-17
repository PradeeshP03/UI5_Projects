sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demo.ladera.assesment1.controller.View1", {
        onInit() {
            // var materialModel = new sap.ui.model.json.JSONModel("model/material.json");
            // this.getView().setModel(materialModel);
            // this.getView().setModel(materialModel);
        },
        onProductRowPress:function(evt){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("listpage"
                ,{
                // "materialIndex" : evt.getSource().getBindingContext("material").getPath().split("/")[1]
                "materialIndex" : evt.getSource().getBindingContext("material").getProperty().materialId
            }
        )
        }
    });
});