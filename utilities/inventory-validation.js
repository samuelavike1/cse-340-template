const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .isLength({ min: 1 })
            .withMessage("Classification name is required.")
            .isAlpha()
            .withMessage("Classification name can only contain alphabetic characters.")
    ]
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        // Rules for each field
        body("inv_make").trim().isLength({ min: 3 }).withMessage("Please provide a make."),
        body("inv_model").trim().isLength({ min: 3 }).withMessage("Please provide a model."),
        body("inv_year").trim().isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage("Please provide a valid year."),
        body("inv_description").trim().isLength({ min: 1 }).withMessage("Please provide a description."),
        body("inv_image").trim().isLength({ min: 1 }).withMessage("Please provide an image path."),
        body("inv_thumbnail").trim().isLength({ min: 1 }).withMessage("Please provide a thumbnail path."),
        body("inv_price").trim().isFloat({ min: 0 }).withMessage("Please provide a valid price."),
        body("inv_miles").trim().isInt({ min: 0 }).withMessage("Please provide valid mileage."),
        body("inv_color").trim().isLength({ min: 1 }).withMessage("Please provide a color."),
        body("classification_id").trim().isInt().withMessage("Please select a classification."),
    ]
}

/* ******************************
 * Check classification data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

/* ******************************
 * Check update data and return errors to edit view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
    const { inv_id, inv_make, inv_model, classification_id } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const classificationSelect = await utilities.buildClassificationList(classification_id)
        const itemName = `${inv_make} ${inv_model}`
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit " + itemName,
            nav,
            classificationSelect,
            inv_id,
            ...req.body
        })
        return
    }
    next()
}



module.exports = validate