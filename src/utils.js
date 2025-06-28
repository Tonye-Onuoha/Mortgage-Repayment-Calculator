const valueIsEmpty = (value) => value.trim().length === 0;

const valueIsNotNumber = (value) => isNaN(value);

const handleInputData = (key, value, errorObject) => {
    if (valueIsEmpty(value)) {
        errorObject[key] = "This field is required";
        return;
    }
    if (key !== "type" && valueIsNotNumber(value)) errorObject[key] = "Please enter a number";
};

const isDataValid = (data, errorsObject) => {
    Object.keys(data).forEach((key) => {
        handleInputData(key, data[key], errorsObject);
    });
    const isValid = Object.keys(errorsObject).length === 0;
    return isValid;
};

export default isDataValid;
