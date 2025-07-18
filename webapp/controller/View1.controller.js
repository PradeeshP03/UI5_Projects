sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demo.ladera.employee.controller.View1", {
        onInit() {
            var employeeModel = new sap.ui.model.json.JSONModel("model/employee.json");
            this.getView().setModel(employeeModel);
            if (!this.onSort) {
                this.onSort = new sap.ui.xmlfragment("demo.ladera.employee.view.addsort", this);
                this.getView().addDependent(this.onSort);
            }
               if (!this.onSort1) {
                this.onSort1 = new sap.ui.xmlfragment("demo.ladera.employee.view.addsortdesc", this);
                this.getView().addDependent(this.onSort1);
            }
            if (!this.addProduct) {
                this.addProduct = new sap.ui.xmlfragment("demo.ladera.employee.view.addproduct", this);
                this.getView().addDependent(this.addProduct);
            }
        },
        onSearchemployees: function (evt) {
            var EmployeeSearch = evt.getParameter("newValue");
            var filters = new sap.ui.model.Filter("EmployeeName", "Contains", EmployeeSearch);
            this.getView().byId("employeelist").getBinding("items").filter(filters);
        },
        onSearchdesignation: function (evt) {
            var DesignationSearch = evt.getParameter("value");
            var filters = new sap.ui.model.Filter("Designation", "Contains", DesignationSearch);
            this.getView().byId("employeelist").getBinding("items").filter(filters);
        },
        onSortPress: function () {
            this.onSort.open();
        },
        onSortPressDes: function () {
            this.onSort1.open();
        },
        onApplySort: function () {
            var oGroup = sap.ui.getCore().byId("sortOrderGroup");
            var selectedIndex = oGroup.getSelectedIndex(); // 0: Ascending, 1: Descending
            var isDescending = selectedIndex === 1;

            var oFieldSelect = sap.ui.getCore().byId("sortFieldSelect");
            var selectedField = oFieldSelect.getSelectedKey(); // e.g., "ProductName", "Location", etc.

            var oSorter = new sap.ui.model.Sorter(selectedField, isDescending);
            this.getView().byId("employeelist").getBinding("items").sort(oSorter);

        },
        onDescending: function (evt) {
            var oSorter = new sap.ui.model.Sorter("EmployeeName", true); // ascending
            this.getView().byId("employeelist").getBinding("items").sort(oSorter);
        },
        onAscending: function (evt) {
            var oSorter = new sap.ui.model.Sorter("EmployeeName", false); // descending
            this.getView().byId("employeelist").getBinding("items").sort(oSorter);
        },
        onAddProduct: function () {
            this.mode = "ADD";
            var newProductObj = {
                "EmployeeId": this.getView().getModel().oData.Employees.length + 1,
                "EmployeeName": "",
                "Designation": "",
                "Location": "",
                "Status": "Error",
                "CheckIn" : "Out"
            };
            var productObj = new sap.ui.model.json.JSONModel(newProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addProduct.open();
        },
        onEditProduct: function () {
            this.mode = "EDIT";
            if (!this.getView().byId("employeelist").getSelectedItem()) {
                sap.m.MessageToast.show("Please select an item to edit!");
                return;
            }
            var editProductObj = this.getView().byId("employeelist").getSelectedItem().getBindingContext().getObject();
            var productObj = new sap.ui.model.json.JSONModel(editProductObj);
            this.getView().setModel(productObj, "productObj");
            this.addProduct.open();
        },       
         onSaveProduct: function () {
            if (this.mode == "ADD") {
                this.getView().getModel().oData.Employees.push(this.getView().getModel("productObj").oData);
                sap.m.MessageToast.show("New Employee is added");
            } else {
                sap.m.MessageToast.show("Employee Deails is Updated");
            }
            // this.getView().getModel().oData.Products.push(this.getView().getModel("productObj").oData);
            this.getView().getModel().updateBindings(true);
            this.addProduct.close();
        },
        // onDelete: function () {
        //     // var selectedTableRow = evt.getSource().getBindingContext().getPath().split("/")[2];
        //     // this.getView().getModel().oData.Products.splice(selectedTableRow, 1);
        //     var editProductObj1 = this.getView().byId("employeelist").getSelectedItem().getBindingContext().getObject();
        //     var productObj = new sap.ui.model.json.JSONModel(editProductObj1);
        //     this.getView().getModel().oData.Employees.splice(editProductObj1);
        //     // this.getView().getModel().oData.Employees.splice(productObj.oData, 1);
        //     this.getView().getModel().updateBindings(true);
        //     sap.m.MessageToast.show("Selected Employee is Deleted !");

        // },
        onDelete: function () {
            var selectedItem = this.getView().byId("employeelist").getSelectedItem();
        
            if (!selectedItem) {
                sap.m.MessageToast.show("Please select an employee to delete.");
                return;
            }
        
            var selectedEmployee = selectedItem.getBindingContext().getObject();
            var employees = this.getView().getModel().getProperty("/Employees");
        
            // Find the index of the selected employee in the Employees array
            var index = employees.findIndex(emp => emp.EmployeeId === selectedEmployee.EmployeeId);
        
            if (index !== -1) {
                employees.splice(index, 1); // Remove the employee at the found index
                this.getView().getModel().updateBindings(true);
                sap.m.MessageToast.show("Selected Employee is Deleted!");
            } else {
                sap.m.MessageToast.show("Employee not found in the list.");
            }
        },  
        onCloseSortDialog: function () {
            this.onSort.close(); 
        },
        onCloseSortDialog1: function (){
            this.onSort1.close(); 
        },
        onCancel: function () {
            this.addProduct.close();
        }   ,  
        onProductRowPress:function(evt){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employeeobject",{
                "productIndex" : evt.getSource().getBindingContext().getPath().split("/")[2]
            })
        },
    });
});