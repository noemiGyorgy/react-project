/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
`;

const SortingButton = styled.button`
  width: 150px;
  height: 44px;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid #555;
  background-color: #555;
  color: white;
  cursor: pointer;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

const SearchField = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 0px 10px 10px 0px;
  border: 2px solid #555;
  flex-grow: 1;
  font-family: inherit;
  padding: 0 10px 0 10px;
  &:focus {
    outline: none;
  }
`;

const CharacterList = styled.div`
  -webkit-column-count: 4; /* Chrome, Safari, Opera */
  -moz-column-count: 4; /* Firefox */
  column-count: 4;
`;

function Characters() {
  const dataContext = useContext(DataContext);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const getCharacters = () => {
    if (!dataContext.isCharLoaded) {
      axios
        .get(
          `${process.env["REACT_APP_THE_ONE_API"]}${process.env["REACT_APP_CHARACTER"]}`,
          {
            headers: {
              Authorization: `Bearer ${process.env["REACT_APP_ACCESS_TOKEN"]}`,
            },
          }
        )
        .then((response) => {
          setFilteredCharacters(response.data.docs);
          setCharacters(response.data.docs);
          dataContext.setCharacters(response.data.docs);
          dataContext.setIsCharLoaded(true);
        });
    } else {
      setCharacters(dataContext.characters);
      setFilteredCharacters(dataContext.characters);
    }
  };

  const fetchData = () => {
    getCharacters();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sorter = (event) => {
    if (event.target.value === "ascending") {
      setFilteredCharacters(
        [...characters].sort((a, b) => (a.name > b.name ? 1 : -1))
      );
      event.target.value = "descending";
      event.target.innerHTML = "Ascending order";
    } else {
      setFilteredCharacters(
        [...characters].sort((a, b) => (a.name < b.name ? 1 : -1))
      );
      event.target.value = "ascending";
      event.target.innerHTML = "Descending order";
    }
  };

  const handleQuery = (event) => {
    const fieldInput = event.target.value.toLowerCase();
    const searchedChar = characters.filter((item) =>
      item.name.toLowerCase().includes(fieldInput)
    );
    if (fieldInput !== "") {
      setFilteredCharacters(searchedChar);
    } else {
      setFilteredCharacters(characters);
    }
  };

  const listCharacters = filteredCharacters.map((item) => (
    <Link
      className="character-link"
      key={item._id}
      to={`/character/${item._id}`}
    >
      <li>{item.name}</li>
    </Link>
  ));

  let charContainer = <span></span>;
  if (dataContext.isCharLoaded) {
    charContainer = listCharacters;
  }
  return (
    <React.Fragment>
      <Container>
        <SortingButton onClick={sorter} value="ascending">
          Ascending order
        </SortingButton>
        <SearchField
          onChange={handleQuery}
          name="inputField"
          type="text"
          placeholder="Search..."
        />
      </Container>
      <CharacterList>{charContainer}</CharacterList>
    </React.Fragment>
  );
}

export default Characters;
