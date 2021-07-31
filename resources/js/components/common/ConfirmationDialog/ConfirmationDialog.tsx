import React, { useState } from "react";
import Button from "../Button";
import styled from "styled-components";
import Modal from "../Modal";

const ConfirmationDialogWrapper = styled.div`
    display: grid;
    grid-gap: 1rem;
    padding: 3rem;
    width: 40rem;
    background-color: ${(props) => props.theme.primaryBackground};
`;

const ConfirmationDialogMessage = styled.h1`
    color: ${(props) => props.theme.primaryText};
`;

const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
`;

const ConfirmationDialogTitle = styled.h1`
    font-size: 2.2rem;
    color: ${(props) => props.theme.colorOrange};
`;

interface CONFIRMATION_DIALOG {
    isOpen: boolean;
    title: string;
    message: string;
    confirmButtonLabel: string;
    isConfirming: boolean;
    onConfirm: Function;
    onClose: Function;
}

const ConfirmationDialog: React.FC<CONFIRMATION_DIALOG> = ({
    isOpen,
    title,
    message,
    onConfirm,
    isConfirming,
    onClose,
    confirmButtonLabel,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ConfirmationDialogWrapper>
                <ConfirmationDialogTitle>{title} </ConfirmationDialogTitle>
                <ConfirmationDialogMessage>{message}</ConfirmationDialogMessage>
                <ButtonSection>
                    <Button onClick={() => onClose()}>Cancel</Button>
                    <Button onClick={() => onConfirm()} disabled={isConfirming}>
                        {confirmButtonLabel}
                    </Button>
                </ButtonSection>
            </ConfirmationDialogWrapper>
        </Modal>
    );
};

export default ConfirmationDialog;
