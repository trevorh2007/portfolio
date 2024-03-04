"use client";

import styled from "styled-components";

export const NavBarWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  a {
    font-size: 28px;
    color: #fff;
    text-decoration: none;
    padding-right: 30px;
  }
  button {
    margin-left: auto;
    background-color: ${({ theme }) => theme.colors.buttonBackground};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};
    padding: 0 10px;
  }
`;
