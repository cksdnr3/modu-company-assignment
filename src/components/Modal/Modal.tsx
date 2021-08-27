import { useToggleReturnTypes } from "hooks/useToggle";
import React from "react";
import styled from "styled-components";

interface ModalTypes extends useToggleReturnTypes {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalTypes> = ({
  toggle,
  width,
  height,
  handleToggle,
  children,
}) => {
  return (
    <ModalWrap toggle={toggle}>
      <Container width={width!} height={height!}>
        {children}
      </Container>
      <OutLayer onClick={handleToggle} />
    </ModalWrap>
  );
};

const ModalWrap = styled.div<{ toggle: boolean }>`
  display: ${(props) => (props.toggle ? "flex" : "none")};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

type ContainerPropsTypes = { height: string; width: string };
const Container = styled.div<ContainerPropsTypes>`
  position: relative;
  height: ${(props) => props.height || ""};
  width: ${(props) => props.width || ""};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  z-index: 10;
`;

const OutLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

export default Modal;
