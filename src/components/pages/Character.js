import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import AppTheme from "../layout/Colors";
import { ThemeContext } from "../../context/ThemeContext";
import Border from "../layout/Border";

const Icon = styled.span`
  font-size: 1.4em;
  margin-right: 10px;
`;

function Character() {
  const [theme] = useContext(ThemeContext);
  const currentTheme = AppTheme[theme];
  const [character, setCharacter] = useState([]);

  const getIdFromWindowUrl = () => {
    const splitUrl = window.location.href.split("/");
    return splitUrl[splitUrl.length - 1];
  };

  useEffect(() => {
    axios
      .get(`https://the-one-api.dev/v2/character/${getIdFromWindowUrl()}`, {
        headers: {
          Authorization: "Bearer HVyql6qHzMTbJ1oJNo-5",
        },
      })
      .then((response) => {
        setCharacter(response.data.docs[0]);
        console.log(response.data.docs[0]);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>{character.name}</h1>
      <Border color={currentTheme.movieColor}>
        <p>
          <Icon>
            <i className="fas fa-yin-yang"></i>
          </Icon>
          <i>Gender: </i>
          {character.gender && character.gender !== "NaN"
            ? character.gender
            : "-"}
        </p>
        <p>
          <Icon>
            <i className="fas fa-frog"></i>
          </Icon>
          <i>Race: </i>{" "}
          {character.race && character.race !== "NaN" ? character.race : "-"}
        </p>
        <p>
          <Icon>
            <i className="fas fa-chess-rook"></i>
          </Icon>
          <i>Realm: </i>{" "}
          {character.realm && character.realm !== "NaN" ? character.realm : "-"}
        </p>
      </Border>
    </React.Fragment>
  );
}

export default Character;
