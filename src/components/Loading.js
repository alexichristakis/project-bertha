import React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

import colors from "../lib/colors";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.transgray};
`;

const LoadingOverlay = () => (
  <Wrapper>
    <ReactLoading type={"spin"} color={colors.blue} height={200} width={200} />
  </Wrapper>
);

export default LoadingOverlay;
