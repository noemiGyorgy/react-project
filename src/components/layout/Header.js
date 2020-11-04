import React, { useContext } from "react";
import logo from "../../media/logo.svg";
import Navigation from "./Navigation";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AppTheme from "./Colors";
import { ThemeContext } from "../../context/ThemeContext";
import ThemeToggler from "./ThemeToggler";

function Header() {
  const [theme] = useContext(ThemeContext);
  const currentTheme = AppTheme[theme];

  const HeaderContainer = styled.div`
    background-color: ${currentTheme.backgroundColor};
    display: flex;
    height: 120px;
    width: 100%;
    align-items: right;
    justify-content: right;
    color: white;
  `;

  const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    align-self: left;
    margin-left: 30px;
  `;

  const Logo = styled.img`
    height: 120px;
    margin-bottom: 20px;
    pointer-events: none;
  `;

  return (
    <div className="Header">
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
        </LogoContainer>
        <Navigation />
        <ThemeToggler />
      </HeaderContainer>
    </div>
  );
}

export default Header;
