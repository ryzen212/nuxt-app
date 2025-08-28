import { rules as ruleFns } from "./rules";
export const Validator = {
  validate: (schema, formData, messages = {}) => {
    const errors = {};

    for (let field in schema) {
      const validations = schema[field];
      const value = formData[field];
      if (
        validations.includes("nullable") &&
        (value === null || value === undefined || value === "")
      ) {
        continue;
      }
      for (let rule of validations) {
        // Rule as string (e.g., "required", "email")
        if (typeof rule === "string") {
          if (!ruleFns[rule](value)) {
            errors[field] = [
              { message: messages[field]?.[rule] || "Invalid input." },
            ];
            break;
          }
        }

        // Rule as object (e.g., { length: { min: 3, max: 10 } })
        if (typeof rule === "object") {
          const [ruleName, params] = Object.entries(rule)[0];
          if (!ruleFns[ruleName](value, params)) {
            errors[field] = [
              { message: messages[field]?.[ruleName] || "Invalid input." },
            ];
            break;
          }
        }
      }
    }

    return errors;
  },

  //   getMessage: (rule, params = {}) => {
  //     const messages = {
  //       required: "This field is required.",
  //       email: "Please enter a valid email address.",
  //       integer: "This field must be a valid integer.",
  //       length: `This field must be between ${params.min} and ${params.max} characters.`,
  //     };
  //     return messages[rule] || "Invalid input.";
  //   },
};
