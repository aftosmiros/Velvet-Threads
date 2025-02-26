import { validationResult } from "express-validator";
import * as validations from "../validations/index.js";

const validateRequest = (validationCategory) => {
  const validationRules = validations[validationCategory];

  // console.log(validations["default"]["register"]);

  if (!validationRules) {
    throw new Error(
      `Validation rules for "${validationCategory}" not defined.`
    );
  }

  return (validationRuleName) => {
    const rules = validationRules[validationRuleName];

    if (!rules) {
      throw new Error(
        `Validation rules for "${validationRuleName}" not found in "${validationCategory}".`
      );
    }

    return [
      ...rules,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors: errors.array(),
          });
        }
        next();
      },
    ];
  };
};

export default validateRequest;