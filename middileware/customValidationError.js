
module.exports.validationMessage = function (errors) {
    errors.forEach(err => {
        console.log(err)
        switch (err.type) {
            case "any.empty":
                err.message = "Value should not be empty!";
                break;
            case "string.min":
                err.message = `Value should have at least ${err.context.limit} characters!`;
                break;
            case "string.max":
                err.message = `Value should have at most ${err.context.limit} characters!`;
                break;
            case "string.regex.base":
                err.message = `Please match the pattern!`;
                break;
            default:
                break;
        }
    });
    return errors
}