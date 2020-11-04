import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";
import styled from "styled-components";

const ThemeTogglerStyle = styled.div`
  padding-right: 30px;
  padding-top: 20px;
  cursor: pointer;
`;

const ThemeToggler = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const dataContext = useContext(DataContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    dataContext.setIsBookLoaded(false);
    dataContext.setIsMovieLoaded(false);
    dataContext.setIsCharLoaded(false);
  };

  return (
    <ThemeTogglerStyle onClick={toggleTheme}>
      <span title="switch theme">{theme === "light" ? "🌙" : "☀️"}</span>
    </ThemeTogglerStyle>
  );
};

export default ThemeToggler;
