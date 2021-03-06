import { useState, useReducer, useMemo, useRef, useCallback } from "react";

import { useCharacters } from "../hooks/useCharacters";

import "../styles/Characters.css";

import { Search } from "./Search";

const initialState = {
  favorites: [],
};

const actionType = {
  addFavorite: "ADD_TO_FAVORITE",
};

const API = "https://rickandmortyapi.com/api/character";

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case actionType.addFavorite:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const Characters = () => {
  const [search, setSearch] = useState("");

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const searchInput = useRef(null);

  // Metodo para consultar la API
  const characters = useCharacters(API);

  // Metodo para agregar un personaje a favoritos con useReducer
  const handleClick = (favorite) => {
    console.log("agrege a favorito a " + favorite.name);
    dispatch({ type: actionType.addFavorite, payload: favorite });
  };

  // Metodo para detectar los caracteres tipiados por el usuario
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  // Metodo para detectar los caracteres tipiados por el usuario usando useCallback
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // Metodo para buscar o filtrar sin memo
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  // Metodo para buscar o filtrar con memo
  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="characters">
      {favorites.favorites.map((favCharacter) => (
        // <h1>Favoritos</h1>
        <li className="favorite-list" key={favCharacter.id}>
          <div className="favorite-list__info">
            <img src={`${favCharacter.image}`} alt={`${favCharacter.name}`} />
            <h2>{favCharacter.name}</h2>
          </div>
        </li>
      ))}

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      {filteredUsers.map((character) => (
        <div className="infor-card" key={character.id}>
          <img src={`${character.image}`} alt={`${character.name}`} />
          <div className="infor-card__text">
            <h2>{character.name}</h2>
            <p>
              <strong>Status: </strong>
              {character.status}
            </p>
            <p>
              <strong>Species: </strong>
              {character.species}
            </p>
            <p>
              <strong>Gender: </strong>
              {character.gender}
            </p>
            <button
              className="btn-favorite"
              type="button"
              onClick={() => handleClick(character)}
            >
              Agregar a Favoritos
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Characters };
