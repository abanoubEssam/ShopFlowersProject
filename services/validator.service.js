import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });

class ApiError extends Error {
    constructor(status, errorMessage) {
        super();
        this.status = status;
        this.message = errorMessage
    }
}


export function validate(data, schema) {
    const validate = ajv.compile(schema);
    let valid = validate(data);
    if (!valid)
        throw new ApiError(422, validate.errors);
}

