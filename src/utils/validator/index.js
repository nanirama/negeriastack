// All validation goes here.
import Validator from "validator";

export const validate = (fields, validationRules) => {
  let errors = {},
    isValid = true;
  validationRules.forEach(obj => {
    const { field, validations } = obj;
    for (let i = 0; i < validations.length; i++) {
      const rule = validations[i].split(":");
      switch (rule[0]) {
        case "numeric":
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isNumeric("" + fields[field])
          ) {
            errors[field] = `${obj.name} must be numeric.`;
            isValid = false;
            continue;
          }
          break;
        case "email":
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isEmail("" + fields[field])
          ) {
            if (
              !Validator.isLength("" + fields[field], { min: 2 }) ||
              !Validator.isLength("" + fields[field], { max: 30 })
            ) {
              errors[field] = `${obj.name} must have atleast 2-30 characters`;
              isValid = false;
              continue;
            }

            errors[field] = `${obj.name} is not a valid email.`;
            isValid = false;
            continue;
          }
          break;
        case "digit":
          const numOfDigits = parseInt(rule[1]);
          if (
            !Validator.isEmpty("" + fields[field]) &&
            !Validator.isLength("" + fields[field], {
              min: numOfDigits,
              max: numOfDigits
            })
          ) {
            errors[field] = `${obj.name} must be of ${numOfDigits} digits.`;
            isValid = false;
            continue;
          }
          break;
        case "password":
          if (!Validator.isEmpty("" + fields[field])) {
            if (
              !Validator.isLength("" + fields[field], { min: 8 }) ||
              !Validator.isLength("" + fields[field], { max: 14 })
            ) {
              errors[field] = `${obj.name} must have atleast 8-14 characters`;
              isValid = false;
              continue;
            }
            var pwd = new RegExp("^(?=.*[A-Z])");
            if (!pwd.test("" + fields[field])) {
              errors[field] = `${obj.name} must contain one capital character`;
              isValid = false;
              continue;
            }
            pwd = new RegExp("^(?=.*[a-z])");
            if (!pwd.test("" + fields[field])) {
              errors[field] = `${obj.name} must contain one small character`;
              isValid = false;
              continue;
            }
            pwd = new RegExp("^(?=.*[0-9])");
            if (!pwd.test("" + fields[field])) {
              errors[field] = `${obj.name} must contain a digit`;
              isValid = false;
              continue;
            }
          }
          break;
        case "required":
          if (Validator.isEmpty("" + fields[field])) {
            errors[field] = `${obj.name} is required.`;
            isValid = false;
            continue;
          }
          break;
        default:
          if (Validator.isEmpty("" + fields[field])) {
            errors[field] = `${obj.name} is required.`;
            isValid = false;
            continue;
          }
          break;
      }
    }
  });

  return { isValid, errors };
};
