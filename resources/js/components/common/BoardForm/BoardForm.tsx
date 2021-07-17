import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { useFormik } from "formik";
import TextField from "../TextField";
import {
    FormWrapper as GeneralFormWrapper,
    FormTitle,
    Form,
} from "../FormLayout";

import { boardValidationSchema } from "../../../validators/boardValidator";

const FormWrapper = styled(GeneralFormWrapper)`
    padding: 3rem;
    width: 40rem;
`;

const ButtonSection = styled.div`
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;
    justify-content: flex-start;
`;

interface INOTE_FORM {
    initialValues: { name: string; description: string };
    onSubmitForm: Function;
    onClose: any;
    formTitle: string;
    buttonLabel: string;
}
const BoardForm: React.FC<INOTE_FORM> = ({
    initialValues,
    onSubmitForm,
    onClose,
    formTitle,
    buttonLabel,
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema: boardValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);

            onSubmitForm(formData);
        },
    });

    return (
        <FormWrapper>
            <FormTitle>
                <h1>{formTitle}</h1>
            </FormTitle>
            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                <TextField
                    id="name"
                    name="name"
                    label="Board Name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />
                <ButtonSection>
                    <Button type="submit">{buttonLabel}</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ButtonSection>
            </Form>
        </FormWrapper>
    );
};

export default BoardForm;
