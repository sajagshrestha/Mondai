import * as yup from "yup";

export const boardValidationSchema = yup.object({
    name: yup.string().required().min(4),
    description: yup.string().max(255).required(),
});
