function validateRequiredField(data, requiredFields) {
    let errors = [];
    for (let i = 0; i < requiredFields.length; i++) {
        let field = requiredFields[i];

        console.log("requiredFields:", requiredFields);
        console.log("data:", data);

        if (!data[field] || data[field].toString().trim() === "") {
            errors.push(`${field} is required`);
        }
    }

    return errors;
}

module.exports = validateRequiredField;
