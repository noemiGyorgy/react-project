import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [bookMenu, setBookMenu] = useState([]);
  const [isBookLoaded, setIsBookLoaded] = useState(false);

  const [movieMenu, setMovieMenu] = useState([]);
  const [isMovieLoaded, setIsMovieLoaded] = useState(false);

  const [characters, setCharacters] = useState([]);
  const [isCharLoaded, setIsCharLoaded] = useState(false);

  return (
    <DataContext.Provider
      value={{
        bookMenu,
        setBookMenu,
        isBookLoaded,
        setIsBookLoaded,
        movieMenu,
        setMovieMenu,
        isMovieLoaded,
        setIsMovieLoaded,
        characters,
        setCharacters,
        isCharLoaded,
        setIsCharLoaded,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
