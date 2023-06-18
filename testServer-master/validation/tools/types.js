const { Types } = require('mongoose');

const got = (value) => !(value == null);

const wrappedValidator = (failCondition, expected, isOptional) => {
  if (failCondition) {
    throw new Error(`Expected ${expected}${isOptional ? ' or nothing' : ''}`);
  }
  return true;
};

const optional = (validator) => (value) => {
  if (got(value)) {
    return validator(value, { isOptional: true });
  }
  return true;
};

const string = (value, { isOptional }) => wrappedValidator(
  typeof value !== 'string',
  'string',
  isOptional,
);

const JWT = (value, { isOptional }) => {
  const parts = value.split('.');
  return wrappedValidator(
    parts.length !== 3,
    'valid JWT',
    isOptional,
  );
};

const mongoId = (value, { isOptional }) => {
  let castError = false;
  try {
    Types.ObjectId(value);
  } catch (e) {
    castError = true;
  }
  return wrappedValidator(
    castError,
    'valid mongo ID',
    isOptional,
  );
};

const date = (value, { isOptional }) => {
  const failedToParse = new Date(value).toString() === 'Invalid Date'
    && new Date(Number(value)).toString() === 'Invalid Date';
  return wrappedValidator(
    failedToParse,
    'valid date',
    isOptional,
  );
};

const number = (value, { isOptional }) => wrappedValidator(
  typeof Number(value) !== 'number',
  'number',
  isOptional,
);

const bool = (value, { isOptional }) => wrappedValidator(
  typeof value !== 'boolean',
  'boolean',
  isOptional,
);

const positiveNumber = (value, { isOptional }) => wrappedValidator(
  typeof Number(value) !== 'number' || Number(value) < 0,
  'positive number',
  isOptional,
);

const array = (value, { isOptional }) => wrappedValidator(
  !Array.isArray(value),
  'array',
  isOptional,
);

const oneOf = (...validators) => (value, { isOptional }) => {
  const errors = [];
  validators.forEach(
    (validator) => {
      try {
        validator(value, { isOptional });
      } catch (e) {
        errors.push(e.message.replace('Expected ', ''));
      }
    },
  );
  if (errors.length === validators.length) {
    throw new Error(`Expected one of types: ${errors}`);
  }
  return true;
};

const arrayOf = (itemValidator) => (value, { isOptional }) => {
  wrappedValidator(
    !Array.isArray(value),
    'array',
    isOptional,
  );
  try {
    value.forEach(
      (item) => itemValidator(item, { isOptional: false }),
    );
  } catch (e) {
    const errorMessage = `Wrong type of array items: ${e.message}`;
    throw new Error(errorMessage);
  }
  return true;
};

const shape = (object) => (value, { isOptional }) => {
  const keysErrors = [];
  let objectError = '';
  if (typeof value !== 'object' || Array.isArray(value)) {
    objectError = `Expected object${isOptional ? ' or nothing' : ''}`;
  }
  Object.keys(object).forEach(
    (fieldName) => {
      try {
        const fieldValidator = object[fieldName];
        const fieldToValidate = value && value[fieldName];
        fieldValidator(fieldToValidate, { isOptional: false });
      } catch (e) {
        keysErrors.push(`${fieldName}: ${e.message}`);
      }
    },
  );
  if (objectError) {
    throw new Error(objectError);
  } else if (keysErrors.length) {
    const errorMessage = `{ ${keysErrors.join(', ')} }`;
    throw new Error(errorMessage);
  }
  return true;
};

module.exports = {
  optional,
  string,
  mongoId,
  date,
  number,
  array,
  arrayOf,
  shape,
  oneOf,
  bool,
  positiveNumber,
  JWT,
};
