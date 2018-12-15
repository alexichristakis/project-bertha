import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import colors from "../lib/colors";

const Wrapper = styled.div`
  position: absolute;
  height: 200vh;
  width: 100vw;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding-top: 30%;
  background-color: ${colors.transgray};
`;

const LoadingOverlay = () => (
  <Wrapper>
    <ReactLoading type={"spin"} color={colors.blue} height={200} width={200} />
  </Wrapper>
);

export default LoadingOverlay;
