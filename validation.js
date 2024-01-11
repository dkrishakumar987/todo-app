//Importing express-validator module
const { validationResult, body } = require("express-validator");

const ErrorHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//Validation Chain Middleware for Creating a Task
const CreateTaskValid = [
    //Validators
    body("id").exists().withMessage("'id' field required"),
    body("id").isInt().withMessage("'id' must be an integer"),
    body("task").exists().withMessage("'task' field required"),
    body("task").isString().withMessage("'task' must be a string"),
    body("created").exists().withMessage("'created' field required"),
    body("created")
        .isISO8601()
        .toDate()
        .withMessage("'created' must be a date"),
    //Sanitizer
    body("task").trim().escape(),
    ErrorHandler,
];

//Validation Chain Middleware for Updating a Task
const UpdateTaskValid = [
    //Validators
    body("id").exists().withMessage("'id' field required"),
    body("id").isInt().withMessage("'id' must be an integer"),
    body("completed").exists().withMessage("'completed' field required"),
    body("completed")
        .isIn([0, 1])
        .withMessage("'completed' must be a boolean(0 or 1)"),
    ErrorHandler,
];

module.exports = {
    CreateTaskValid,
    UpdateTaskValid,
};
