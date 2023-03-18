import styled from "styled-components";
import { Button } from "antd";

export const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
`;

export const ButtonLogin = styled(Button)`
  position: absolute;
  width: 100%;
`;

export const Image = styled.img`
  position: absolute;
  left: -90%;
  width: 90%;
  @media (width < 600px) {
    display: none;
  }
`;

export const AlertMessage = styled.div`
  position: absolute;
`;

export const Logo = styled.img`
  position: absolute;
  top: -80%;
  width: 80%;
`;
