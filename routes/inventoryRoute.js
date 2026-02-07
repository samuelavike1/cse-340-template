const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory management view
router.get("/", utilities.checkAccountType, utilities.handleErrors(invController.buildManagement))

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId))

// Route to build add classification view
router.get("/add-classification", utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification))

// Route to process add classification
router.post(
    "/add-classification",
    utilities.checkAccountType,
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view
router.get("/add-inventory", utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory))

// Route to process add inventory
router.post(
    "/add-inventory",
    utilities.checkAccountType,
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
)

// Route to build the edit inventory view
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.editInventoryView))

// Route to process the update
router.post(
    "/update/",
    utilities.checkAccountType,
    invValidate.inventoryRules(),
    invValidate.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

// Route to build the delete confirmation view
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.buildDeleteView))

// Route to process the delete
router.post("/delete", utilities.checkAccountType, utilities.handleErrors(invController.deleteInventory))

// Route to trigger intentional error (for testing error handling)
router.get("/trigger-error", utilities.handleErrors(invController.triggerError))

module.exports = router