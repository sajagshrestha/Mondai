import React, { useRef } from "react";
import styled from "styled-components";

const ModalBackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
    background-color: ${(props) => props.theme.colorBackDrop};
    z-index: 10;
`;
const ModalContent = styled.div`
    z-index: 20;
    box-shadow: 4px 10px 30px rgba(0, 0, 0, 0.5);
`;

interface IPROPS {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: Function;
}

const Modal: React.FC<IPROPS> = ({ children, isOpen, onClose }) => {
    const backDropRef = useRef(null);

    const onBackDropClick = (e: React.MouseEvent) => {
        if (e.target === backDropRef.current) {
            onClose();
        }
    };

    return (
        <>
            {isOpen ? (
                <ModalBackDrop ref={backDropRef} onClick={onBackDropClick}>
                    <ModalContent>{children}</ModalContent>
                </ModalBackDrop>
            ) : null}
        </>
    );
};

export default Modal;
