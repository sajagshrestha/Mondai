import React from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useReduxDispatch, useReduxSelector } from "../../../reducers";

const Snackbar = () => {
    const { isOpen, message, severity } = useReduxSelector(
        (state) => state.snackbar
    );

    const dispatch = useReduxDispatch();

    const closeSnackbar = () => dispatch({ type: "CLOSE_SNACKBAR" });

    return (
        <MuiSnackbar
            open={isOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={3000}
            onClose={closeSnackbar}
        >
            <Alert elevation={6} variant="filled" severity={severity}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;
