/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";
import AppTheme from "./Colors";

const NavBar = styled.div`
  height: 120px;
  background-color: ${(props) => props.bgColor};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.color};
  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props) => props.bgColor};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  z-index: 1;
  margin-top: 20px;
  & a {
    color: ${(props) => props.color};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  & a:hover {
    background-color: ${(props) => props.dropdownColor};
  }
`;

const Button = styled.div`
  position: relative;
  display: inline-block;
  width: 160px;
  height: 120px;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: 16px;
  border: none;
  &:hover {
    color: gray;
  }
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const ButtonTitle = styled.div`
  margin-top: 80px;
  &:hover ${DropdownContent} {
    display: block;
  }
`;
export default function Navigation() {
  const [theme] = useContext(ThemeContext);
  const currentTheme = AppTheme[theme];
  const dataContext = useContext(DataContext);
  const [bookMenu, setBookMenu] = useState([]);
  const [movieMenu, setMovieMenu] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getBooks = () => {
    if (!dataContext.isBookLoaded) {
      axios
        .get(
          `${process.env["REACT_APP_THE_ONE_API"]}${process.env["REACT_APP_BOOK"]}`,
          {
            headers: {
              Authorization: `Bearer ${process.env["REACT_APP_ACCESS_TOKEN"]}`,
            },
          }
        )
        .then((response) => {
          setBookMenu(response.data.docs);
          dataContext.setBookMenu(response.data.docs);
          setBookList(
            bookMenu.map((item) => (
              <Link key={item._id} to={"/book/" + item._id}>
                {item.name}
              </Link>
            ))
          );
          dataContext.setIsBookLoaded(true);
        });
    } else {
      setBookMenu(dataContext.bookMenu);
    }
  };

  const getMovies = () => {
    if (!dataContext.isMovieLoaded) {
      axios
        .get(
          `${process.env["REACT_APP_THE_ONE_API"]}${process.env["REACT_APP_MOVIE"]}`,
          {
            headers: {
              Authorization: `Bearer ${process.env["REACT_APP_ACCESS_TOKEN"]}`,
            },
          }
        )
        .then((response) => {
          setMovieMenu(response.data.docs);
          dataContext.setMovieMenu(response.data.docs);
          setMovieList(
            movieMenu.map((item) => (
              <Link key={item._id} to={"/movie/" + item._id}>
                {item.name}
              </Link>
            ))
          );
          dataContext.setIsMovieLoaded(true);
        });
    } else {
      setMovieMenu(dataContext.movieMenu);
    }
  };

  const fetchData = () => {
    getBooks();
    getMovies();
  };

  useEffect(() => {
    fetchData();
  }, [bookList, movieList]);

  let books = <span></span>;
  let movies = <span></span>;
  if (dataContext.isBookLoaded && dataContext.isMovieLoaded) {
    books = bookList;
    movies = movieList;
  }
  return (
    <NavBar color={currentTheme.backgroundColor}>
      <Button
        color={currentTheme.textColor}
        bgColor={currentTheme.backgroundColor}
      >
        <ButtonTitle>BOOKS</ButtonTitle>
        <DropdownContent
          dropdownColor={currentTheme.dropDownBackgroundHoverColor}
          color={currentTheme.textColor}
          bgColor={currentTheme.dropDownBackgroundColor}
        >
          {books}
        </DropdownContent>
      </Button>
      <Button
        color={currentTheme.textColor}
        bgColor={currentTheme.backgroundColor}
      >
        <ButtonTitle>MOVIES</ButtonTitle>
        <DropdownContent
          dropdownColor={currentTheme.dropDownBackgroundHoverColor}
          color={currentTheme.textColor}
          bgColor={currentTheme.dropDownBackgroundColor}
        >
          {movies}
        </DropdownContent>
      </Button>
      <Button
        color={currentTheme.textColor}
        bgColor={currentTheme.backgroundColor}
      >
        <NavLink color={currentTheme.textColor} to="/characters">
          <ButtonTitle>CHARACTERS</ButtonTitle>
        </NavLink>
      </Button>
    </NavBar>
  );
}
