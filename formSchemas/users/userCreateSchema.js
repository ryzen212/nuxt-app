import { Validator } from "../validator";

const { validate } = Validator;
const resolver = ({ values }) => {
  const fields = {
    userName: ["required", { length: { min: 1, max: 255 } }],
    email: ["required", "email", { length: { min: 1, max: 255 } }],
    role: ["required", { length: { min: 1, max: 255 } }],
    password: ["required", { length: { min: 1, max: 255 } }],
    phoneNumber: ["required", { length: { min: 1, max: 12 } }],
  };

  const messages = {
    userName: {
      required: "Username is required!",
      length: "Username length must be between 1 and 255.",
    },
    email: {
      required: "Email is required!",
      email: "Invalid Email!",
      length: "Username length must be between 1 and 255.",
    },
    password: {
      required: "Password is required!",
      length: "Password length must be between 1 and 255.",
    },
    role: {
      required: "Role is required!",
      length: "Role length must be between 1 and 255.",
    },
    password: {
      required: "Phone number is required!",
      length: "Phone number length must be between 1 and 255.",
    },
  };

  let errors = validate(fields, values, messages);

  return {
    values,
    errors,
  };
};
export { resolver };
