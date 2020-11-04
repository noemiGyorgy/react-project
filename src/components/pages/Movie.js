import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";
import AppTheme from "../layout/Colors";
import Border from "../layout/Border";

const Movie = (props) => {
  const [theme] = useContext(ThemeContext);
  const currentTheme = AppTheme[theme];

  const Icon = styled.span`
    font-size: 1.4em;
    margin-right: 10px;
  `;

  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovieRequest = (movieUrl) => {
    const accessToken = "HVyql6qHzMTbJ1oJNo-5";
    return axios
      .get(movieUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setMovie(res.data.docs[0]);
      });
  };

  useEffect(() => {
    const movieUrl = `https://the-one-api.dev/v2/movie/${id}`;
    getMovieRequest(movieUrl);
  }, [id]);

  return (
    <React.Fragment>
      <h1>{movie.name}</h1>
      <Border color={currentTheme.movieColor}>
        <p>
          <Icon>
            <i className="fas fa-star"></i>
          </Icon>
          Academy Award Nominations: {movie.academyAwardNominations}
        </p>
        <p>
          <Icon>
            <i className="fas fa-trophy"></i>
          </Icon>
          Academy Award Wins: {movie.academyAwardWins}
        </p>
        <p>
          <Icon>
            <i className="fas fa-money-bill"></i>
          </Icon>
          Box Office Revenue: {movie.boxOfficeRevenueInMillions} millions
        </p>
        <p>
          <Icon>
            <i className="fas fa-wallet"></i>
          </Icon>
          Budget: {movie.budgetInMillions} millions
        </p>
        <p>
          <Icon>
            <i className="fas fa-clock"></i>
          </Icon>
          Runtime: {movie.runtimeInMinutes} minutes
        </p>
      </Border>
    </React.Fragment>
  );
};

export default Movie;
