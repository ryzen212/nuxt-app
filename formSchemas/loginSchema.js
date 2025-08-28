import { Validator } from "./validator";

const { validate } = Validator;
const resolver = ({ values }) => {
  const fields = {
    username: ["required", { length: { min: 1, max: 255 } }],
    password: ["required", { length: { min: 1, max: 255 } }],
  };

  const messages = {
    username: {
      required: "Username is required!",
      length: "Username length must be between 1 and 255.",
    },
    password: {
      required: "Password is required!",
    },
  };

  let errors = validate(fields, values, messages);

  return {
    values,
    errors,
  };
};
export { resolver };
