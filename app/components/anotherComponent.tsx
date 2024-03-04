"use client";

import styled from "styled-components";

export const HomeWrapper = styled.div`
  font-size: 24px;
  color: red;
`;

const AnotherComponent = () => {
  return <HomeWrapper>Just another component</HomeWrapper>;
};

export default AnotherComponent;
